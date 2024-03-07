const PI2 = 2 * Math.PI;

export class Canvas {
    constructor(dims = [400, 300], scale = 1, scaleToFit = false, useDpi = false) {
        const dpi = useDpi ? window.devicePixelRatio : 1;

        this.dims = Array.from(dims);
        this.targetDims = Array.from(dims);
        this.scale = scale * dpi;
        this.scaleToFit = scaleToFit;

        const el = document.createElement('canvas');

        const d = [
            dims[0] * this.scale,
            dims[1] * this.scale,
        ];
        el.setAttribute('width',  Math.floor(d[0]));
        el.setAttribute('height', Math.floor(d[1]));
        el.style.width =  `${Math.floor(d[0] / dpi)}px`;
        el.style.height = `${Math.floor(d[1] / dpi)}px`;

        document.body.appendChild(el);
        this.el = el;
        this.ctx = el.getContext('2d');

        this.children = [];

        if (scaleToFit) {
            this.ar = dims[0] / dims[1];
            const onResize = () => {
                const W = window.innerWidth;
                const H = window.innerHeight;
                const dpi = window.devicePixelRatio;

                const ar = W / H;

                if (ar < this.ar) {
                    this.scale = W / this.targetDims[0] * dpi;
                    
                } else {
                    this.scale = H / this.targetDims[1] * dpi;
                }

                this.dims[0] = Math.floor(this.targetDims[0] * this.scale);
                this.dims[1] = Math.floor(this.targetDims[1] * this.scale);

                this.el.setAttribute('width', this.dims[0]);
                this.el.setAttribute('height', this.dims[1]);

                el.style.width = `${Math.floor(this.dims[0] / dpi)}px`;
                el.style.height = `${Math.floor(this.dims[1] / dpi)}px`;

                //this.ctx = this.el.getContext('2d'); // TO optional?
            }

            window.addEventListener('resize', onResize);

            onResize();
        }
    }

    add(o) {
        this.children.push(o);
    }

    remove(o) {
        const idx = this.children.indexOf(o);
        if (idx === -1 && this.children) {
            for (const o2 of this.children.toReversed()) {
                if (!o2.remove) continue;
                const res = o2.remove(o);
                if (res) return true;
            }
        } else if (idx >= 0) {
            this.children.splice(idx, 1);
            return true;
        }
        return false;
    }

    drawFrame() {
        this.ctx.clearRect(0, 0, this.dims[0], this.dims[1]);
        
        this.ctx.save();
            this.ctx.scale(this.scale, this.scale);

            for (const o of this.children) {
                o.render(this.ctx);
            }
        this.ctx.restore();
    }
}

export class Group {
    constructor(translate = [0, 0]) {
        this.children = [];
        this.translate = translate;
    }

    add(o) {
        this.children.push(o);
    }

    remove(o) {
        const idx = this.children.indexOf(o);
        if (idx === -1 && this.children) {
            for (const o2 of this.children.toReversed()) {
                if (!o2.remove) continue;
                const res = o2.remove(o);
                if (res) return true;
            }
        } else if (idx >= 0) {
            this.children.splice(idx, 1);
            return true;
        }
        return false;
    }

    render(ctx) {
        const [tx, ty] = this.translate;
        const needsTranslate = tx !== 0 || ty !== 0;
        if (needsTranslate) {
            ctx.save();
            ctx.translate(tx, ty);
        }
        for (const o of this.children) {
            o.render(ctx);
        }
        if (needsTranslate) {
            ctx.restore();
        }
    }
}

export class Circle {
    constructor(pos = [0, 0], r = 10, color = 'red') {
        this.pos = pos;
        this.r = r;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;

        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth || 1;
        }

        if (this.alpha !== 1) {
            ctx.globalAlpha = this.alpha;
        }
         
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.r, 0, PI2, false);

        if (this.strokeColor) {
            ctx.stroke();
        }

        ctx.fill();

        if (this.alpha !== 1) {
            ctx.globalAlpha = 1;
        }
    }
}

export class Square {
    constructor(pos = [0, 0], side = 10, color = 'red') {
        this.pos = pos;
        this.side = side;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;

        let sw = 0;

        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            sw = this.strokeWidth || 1;
            ctx.lineWidth = sw;
        }

        const x = this.pos[0] - this.side / 2;
        const y = this.pos[1] - this.side / 2;
        const w = this.side;
        const h = this.side;

        if (this.alpha !== 1) {
            ctx.globalAlpha = this.alpha;
        }

        ctx.fillRect(x, y, w, h);

        if (this.strokeColor) {
            ctx.strokeRect(x-sw/2, y-sw/2, w+sw, h+sw);
        }

        if (this.alpha !== 1) {
            ctx.globalAlpha = 1;
        }
    }
}

export class Path {
    constructor(pos, points, color = 'red') {
        this.pos = pos;
        this.points = points;
        this.color = color;
        this.angle = 0;
        this.rotatePos = [0, 0];
    }

    render(ctx) {
        ctx.fillStyle = this.color;

        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth || 1;
        }

        if (this.alpha !== 1) {
            ctx.globalAlpha = this.alpha;
        }

        ctx.save();
            ctx.translate(this.pos[0], this.pos[1]);
            ctx.rotate(this.angle);
            ctx.translate(-this.rotatePos[0], -this.rotatePos[1]);
            
            ctx.beginPath();
            this.points.forEach(([x, y], i) => {
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();

            if (this.strokeColor) {
                ctx.stroke();
            }

            ctx.fill();
        ctx.restore();

        if (this.alpha !== 1) {
            ctx.globalAlpha = 1;
        }
    }
}

export class Label {
    constructor(pos = [0, 0], color = 'red', font = '16px sans-serif') {
        this.pos = pos;
        this.color = color;
        this.font = font;
        this.text = '';
    }

    setText(value) {
        this.text = value;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (this.alpha !== 1) {
            ctx.globalAlpha = this.alpha;
        }

        ctx.fillText(this.text, this.pos[0], this.pos[1]);

        if (this.alpha !== 1) {
            ctx.globalAlpha = 1;
        }
    }
}
