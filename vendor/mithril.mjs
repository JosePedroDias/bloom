// https://cdn.jsdelivr.net/npm/mithril@2.2.2/+esm

/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/mithril@2.2.2/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function t(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,events:void 0,instance:void 0}}t.normalize=function(e){return Array.isArray(e)?t("[",void 0,void 0,t.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:t("#",void 0,void 0,String(e),void 0,void 0)},t.normalizeChildren=function(e){var n=[];if(e.length){for(var r=null!=e[0]&&null!=e[0].key,o=1;o<e.length;o++)if((null!=e[o]&&null!=e[o].key)!==r)throw new TypeError(!r||null==e[o]&&"boolean"!=typeof e[o]?"In fragments, vnodes must either all have keys or none have keys.":"In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole.");for(o=0;o<e.length;o++)n[o]=t.normalize(e[o])}return n};var n=t,r=n,o=function(){var e,t=arguments[this],n=this+1;if(null==t?t={}:("object"!=typeof t||null!=t.tag||Array.isArray(t))&&(t={},n=this),arguments.length===n+1)e=arguments[n],Array.isArray(e)||(e=[e]);else for(e=[];n<arguments.length;)e.push(arguments[n++]);return r("",t.key,t,e)},i={}.hasOwnProperty,l=n,a=o,s=i,u=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,f={};function c(e){for(var t in e)if(s.call(e,t))return!1;return!0}var d=function(e){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var t=a.apply(1,arguments);return"string"==typeof e&&(t.children=l.normalizeChildren(t.children),"["!==e)?function(e,t){var n=t.attrs,r=s.call(n,"class"),o=r?n.class:n.className;if(t.tag=e.tag,t.attrs={},!c(e.attrs)&&!c(n)){var i={};for(var l in n)s.call(n,l)&&(i[l]=n[l]);n=i}for(var l in e.attrs)s.call(e.attrs,l)&&"className"!==l&&!s.call(n,l)&&(n[l]=e.attrs[l]);for(var l in null==o&&null==e.attrs.className||(n.className=null!=o?null!=e.attrs.className?String(e.attrs.className)+" "+String(o):o:null!=e.attrs.className?e.attrs.className:null),r&&(n.class=null),n)if(s.call(n,l)&&"key"!==l){t.attrs=n;break}return t}(f[e]||function(e){for(var t,n="div",r=[],o={};t=u.exec(e);){var i=t[1],l=t[2];if(""===i&&""!==l)n=l;else if("#"===i)o.id=l;else if("."===i)r.push(l);else if("["===t[3][0]){var a=t[6];a&&(a=a.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?r.push(a):o[t[4]]=""===a?a:a||!0}}return r.length>0&&(o.className=r.join(" ")),f[e]={tag:n,attrs:o}}(e),t):(t.tag=e,t)},p=n,h=n,m=o,v=d;v.trust=function(e){return null==e&&(e=""),p("<",void 0,void 0,e,void 0,void 0)},v.fragment=function(){var e=m.apply(0,arguments);return e.tag="[",e.children=h.normalizeChildren(e.children),e};var y=v,g={exports:{}},w=function(e){if(!(this instanceof w))throw new Error("Promise must be called with 'new'.");if("function"!=typeof e)throw new TypeError("executor must be a function.");var t=this,n=[],r=[],o=s(n,!0),i=s(r,!1),l=t._instance={resolvers:n,rejectors:r},a="function"==typeof setImmediate?setImmediate:setTimeout;function s(e,o){return function s(f){var c;try{if(!o||null==f||"object"!=typeof f&&"function"!=typeof f||"function"!=typeof(c=f.then))a((function(){o||0!==e.length||console.error("Possible unhandled promise rejection:",f);for(var t=0;t<e.length;t++)e[t](f);n.length=0,r.length=0,l.state=o,l.retry=function(){s(f)}}));else{if(f===t)throw new TypeError("Promise can't be resolved with itself.");u(c.bind(f))}}catch(e){i(e)}}}function u(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(i);try{e(n(o),r)}catch(e){r(e)}}u(e)};w.prototype.then=function(e,t){var n,r,o=this._instance;function i(e,t,i,l){t.push((function(t){if("function"!=typeof e)i(t);else try{n(e(t))}catch(e){r&&r(e)}})),"function"==typeof o.retry&&l===o.state&&o.retry()}var l=new w((function(e,t){n=e,r=t}));return i(e,o.resolvers,n,!0),i(t,o.rejectors,r,!1),l},w.prototype.catch=function(e){return this.then(null,e)},w.prototype.finally=function(e){return this.then((function(t){return w.resolve(e()).then((function(){return t}))}),(function(t){return w.resolve(e()).then((function(){return w.reject(t)}))}))},w.resolve=function(e){return e instanceof w?e:new w((function(t){t(e)}))},w.reject=function(e){return new w((function(t,n){n(e)}))},w.all=function(e){return new w((function(t,n){var r=e.length,o=0,i=[];if(0===e.length)t([]);else for(var l=0;l<e.length;l++)!function(l){function a(e){o++,i[l]=e,o===r&&t(i)}null==e[l]||"object"!=typeof e[l]&&"function"!=typeof e[l]||"function"!=typeof e[l].then?a(e[l]):e[l].then(a,n)}(l)}))},w.race=function(e){return new w((function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)}))};var b=w,x=b;"undefined"!=typeof window?(void 0===window.Promise?window.Promise=x:window.Promise.prototype.finally||(window.Promise.prototype.finally=x.prototype.finally),g.exports=window.Promise):void 0!==e?(void 0===e.Promise?e.Promise=x:e.Promise.prototype.finally||(e.Promise.prototype.finally=x.prototype.finally),g.exports=e.Promise):g.exports=x;var k=n,S=function(e){var t,n=e&&e.document,r={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function o(e){return e.attrs&&e.attrs.xmlns||r[e.tag]}function i(e,t){if(e.state!==t)throw new Error("'vnode.state' must not be modified.")}function l(e){var t=e.state;try{return this.apply(t,arguments)}finally{i(e,t)}}function a(){try{return n.activeElement}catch(e){return null}}function s(e,t,n,r,o,i,l){for(var a=n;a<r;a++){var s=t[a];null!=s&&u(e,s,o,l,i)}}function u(e,t,r,i,a){var f=t.tag;if("string"==typeof f)switch(t.state={},null!=t.attrs&&q(t.attrs,t,r),f){case"#":!function(e,t,r){t.dom=n.createTextNode(t.children),w(e,t.dom,r)}(e,t,a);break;case"<":c(e,t,i,a);break;case"[":!function(e,t,r,o,i){var l=n.createDocumentFragment();if(null!=t.children){var a=t.children;s(l,a,0,a.length,r,null,o)}t.dom=l.firstChild,t.domSize=l.childNodes.length,w(e,l,i)}(e,t,r,i,a);break;default:!function(e,t,r,i,l){var a=t.tag,u=t.attrs,f=u&&u.is;i=o(t)||i;var c=i?f?n.createElementNS(i,a,{is:f}):n.createElementNS(i,a):f?n.createElement(a,{is:f}):n.createElement(a);t.dom=c,null!=u&&function(e,t,n){"input"===e.tag&&null!=t.type&&e.dom.setAttribute("type",t.type);var r=null!=t&&"input"===e.tag&&"file"===t.type;for(var o in t)P(e,o,null,t[o],n,r)}(t,u,i);if(w(e,c,l),!b(t)&&null!=t.children){var d=t.children;s(c,d,0,d.length,r,null,i),"select"===t.tag&&null!=u&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;e.dom.value===n&&-1!==e.dom.selectedIndex||(e.dom.value=n)}"selectedIndex"in t&&P(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,u)}}(e,t,r,i,a)}else!function(e,t,n,r,o){(function(e,t){var n;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(n=e.state.view).$$reentrantLock$$)return;n.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(n=e.tag).$$reentrantLock$$)return;n.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}q(e.state,e,t),null!=e.attrs&&q(e.attrs,e,t);if(e.instance=k.normalize(l.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");n.$$reentrantLock$$=null})(t,n),null!=t.instance?(u(e,t.instance,n,r,o),t.dom=t.instance.dom,t.domSize=null!=t.dom?t.instance.domSize:0):t.domSize=0}(e,t,r,i,a)}var f={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function c(e,t,r,o){var i=t.children.match(/^\s*?<(\w+)/im)||[],l=n.createElement(f[i[1]]||"div");"http://www.w3.org/2000/svg"===r?(l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",l=l.firstChild):l.innerHTML=t.children,t.dom=l.firstChild,t.domSize=l.childNodes.length,t.instance=[];for(var a,s=n.createDocumentFragment();a=l.firstChild;)t.instance.push(a),s.appendChild(a);w(e,s,o)}function d(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)s(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)x(e,t,0,t.length);else{var l=null!=t[0]&&null!=t[0].key,a=null!=n[0]&&null!=n[0].key,f=0,c=0;if(!l)for(;c<t.length&&null==t[c];)c++;if(!a)for(;f<n.length&&null==n[f];)f++;if(l!==a)x(e,t,c,t.length),s(e,n,f,n.length,r,o,i);else if(a){for(var d,g,w,b,k,E=t.length-1,j=n.length-1;E>=c&&j>=f&&(w=t[E],b=n[j],w.key===b.key);)w!==b&&p(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),E--,j--;for(;E>=c&&j>=f&&(d=t[c],g=n[f],d.key===g.key);)c++,f++,d!==g&&p(e,d,g,r,v(t,c,o),i);for(;E>=c&&j>=f&&f!==j&&d.key===b.key&&w.key===g.key;)y(e,w,k=v(t,c,o)),w!==g&&p(e,w,g,r,k,i),++f<=--j&&y(e,d,o),d!==b&&p(e,d,b,r,o,i),null!=b.dom&&(o=b.dom),c++,w=t[--E],b=n[j],d=t[c],g=n[f];for(;E>=c&&j>=f&&w.key===b.key;)w!==b&&p(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),j--,w=t[--E],b=n[j];if(f>j)x(e,t,c,E+1);else if(c>E)s(e,n,f,j+1,r,o,i);else{var C,P,z=o,T=j-f+1,A=new Array(T),N=0,O=0,I=2147483647,$=0;for(O=0;O<T;O++)A[O]=-1;for(O=j;O>=f;O--){null==C&&(C=h(t,c,E+1));var L=C[(b=n[O]).key];null!=L&&(I=L<I?L:-1,A[O-f]=L,w=t[L],t[L]=null,w!==b&&p(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),$++)}if(o=z,$!==E-c+1&&x(e,t,c,E+1),0===$)s(e,n,f,j+1,r,o,i);else if(-1===I)for(P=function(e){var t=[0],n=0,r=0,o=0,i=m.length=e.length;for(o=0;o<i;o++)m[o]=e[o];for(o=0;o<i;++o)if(-1!==e[o]){var l=t[t.length-1];if(e[l]<e[o])m[o]=l,t.push(o);else{for(n=0,r=t.length-1;n<r;){var a=(n>>>1)+(r>>>1)+(n&r&1);e[t[a]]<e[o]?n=a+1:r=a}e[o]<e[t[n]]&&(n>0&&(m[o]=t[n-1]),t[n]=o)}}n=t.length,r=t[n-1];for(;n-- >0;)t[n]=r,r=m[r];return m.length=0,t}(A),N=P.length-1,O=j;O>=f;O--)g=n[O],-1===A[O-f]?u(e,g,r,i,o):P[N]===O-f?N--:y(e,g,o),null!=g.dom&&(o=n[O].dom);else for(O=j;O>=f;O--)g=n[O],-1===A[O-f]&&u(e,g,r,i,o),null!=g.dom&&(o=n[O].dom)}}else{var R=t.length<n.length?t.length:n.length;for(f=f<c?f:c;f<R;f++)(d=t[f])===(g=n[f])||null==d&&null==g||(null==d?u(e,g,r,i,v(t,f+1,o)):null==g?S(e,d):p(e,d,g,r,v(t,f+1,o),i));t.length>R&&x(e,t,f,t.length),n.length>R&&s(e,n,f,n.length,r,o,i)}}}function p(e,t,n,r,i,a){var s=t.tag;if(s===n.tag){if(n.state=t.state,n.events=t.events,function(e,t){do{var n;if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate)if(void 0!==(n=l.call(e.attrs.onbeforeupdate,e,t))&&!n)break;if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate)if(void 0!==(n=l.call(e.state.onbeforeupdate,e,t))&&!n)break;return!1}while(0);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(n,t))return;if("string"==typeof s)switch(null!=n.attrs&&D(n.attrs,n,r),s){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children);t.dom=e.dom}(t,n);break;case"<":!function(e,t,n,r,o){t.children!==n.children?(E(e,t),c(e,n,r,o)):(n.dom=t.dom,n.domSize=t.domSize,n.instance=t.instance)}(e,t,n,a,i);break;case"[":!function(e,t,n,r,o,i){d(e,t.children,n.children,r,o,i);var l=0,a=n.children;if(n.dom=null,null!=a){for(var s=0;s<a.length;s++){var u=a[s];null!=u&&null!=u.dom&&(null==n.dom&&(n.dom=u.dom),l+=u.domSize||1)}1!==l&&(n.domSize=l)}}(e,t,n,r,i,a);break;default:!function(e,t,n,r){var i=t.dom=e.dom;r=o(t)||r,"textarea"===t.tag&&null==t.attrs&&(t.attrs={});(function(e,t,n,r){t&&t===n&&console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");if(null!=n){"input"===e.tag&&null!=n.type&&e.dom.setAttribute("type",n.type);var o="input"===e.tag&&"file"===n.type;for(var i in n)P(e,i,t&&t[i],n[i],r,o)}var l;if(null!=t)for(var i in t)null==(l=t[i])||null!=n&&null!=n[i]||z(e,i,l,r)})(t,e.attrs,t.attrs,r),b(t)||d(i,e.children,t.children,n,null,r)}(t,n,r,a)}else!function(e,t,n,r,o,i){if(n.instance=k.normalize(l.call(n.state.view,n)),n.instance===n)throw Error("A view cannot return the vnode it received as argument");D(n.state,n,r),null!=n.attrs&&D(n.attrs,n,r);null!=n.instance?(null==t.instance?u(e,n.instance,r,i,o):p(e,t.instance,n.instance,r,o,i),n.dom=n.instance.dom,n.domSize=n.instance.domSize):null!=t.instance?(S(e,t.instance),n.dom=void 0,n.domSize=0):(n.dom=t.dom,n.domSize=t.domSize)}(e,t,n,r,i,a)}else S(e,t),u(e,n,r,a,i)}function h(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}var m=[];function v(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function y(e,t,r){var o=n.createDocumentFragment();g(e,o,t),w(e,o,r)}function g(e,t,n){for(;null!=n.dom&&n.dom.parentNode===e;){if("string"!=typeof n.tag){if(null!=(n=n.instance))continue}else if("<"===n.tag)for(var r=0;r<n.instance.length;r++)t.appendChild(n.instance[r]);else if("["!==n.tag)t.appendChild(n.dom);else if(1===n.children.length){if(null!=(n=n.children[0]))continue}else for(r=0;r<n.children.length;r++){var o=n.children[r];null!=o&&g(e,t,o)}break}}function w(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function b(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted.");return!0}function x(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&S(e,i)}}function S(e,t){var n,r,o,a=0,s=t.state;"string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&(null!=(o=l.call(t.state.onbeforeremove,t))&&"function"==typeof o.then&&(a=1,n=o));t.attrs&&"function"==typeof t.attrs.onbeforeremove&&(null!=(o=l.call(t.attrs.onbeforeremove,t))&&"function"==typeof o.then&&(a|=2,r=o));if(i(t,s),a){if(null!=n){var u=function(){1&a&&((a&=2)||f())};n.then(u,u)}if(null!=r){u=function(){2&a&&((a&=1)||f())};r.then(u,u)}}else C(t),j(e,t);function f(){i(t,s),C(t),j(e,t)}}function E(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function j(e,t){for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)E(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&j(e,r)}}break}}function C(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&l.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&l.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&C(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&C(r)}}}function P(e,t,r,o,i,l){if(!("key"===t||"is"===t||null==o||T(t)||r===o&&!function(e,t){return"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===a()||"option"===e.tag&&e.dom.parentNode===n.activeElement}(e,t)&&"object"!=typeof o||"type"===t&&"input"===e.tag)){if("o"===t[0]&&"n"===t[1])return _(e,t,o);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),o);else if("style"===t)L(e.dom,r,o);else if(A(e,t,i)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+o&&(l||e.dom===a()))return;if("select"===e.tag&&null!==r&&e.dom.value===""+o)return;if("option"===e.tag&&null!==r&&e.dom.value===""+o)return;if(l&&""+o!="")return void console.error("`value` is read-only on file inputs!")}e.dom[t]=o}else"boolean"==typeof o?o?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,o)}}function z(e,t,n,r){if("key"!==t&&"is"!==t&&null!=n&&!T(t))if("o"===t[0]&&"n"===t[1])_(e,t,void 0);else if("style"===t)L(e.dom,n,null);else if(!A(e,t,r)||"className"===t||"title"===t||"value"===t&&("option"===e.tag||"select"===e.tag&&-1===e.dom.selectedIndex&&e.dom===a())||"input"===e.tag&&"type"===t){var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}else e.dom[t]=null}function T(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function A(e,t,n){return void 0===n&&(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}var N,O=/[A-Z]/g;function I(e){return"-"+e.toLowerCase()}function $(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(O,I)}function L(e,t,n){if(t===n);else if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)for(var r in e.style.cssText="",n){null!=(o=n[r])&&e.style.setProperty($(r),String(o))}else{for(var r in n){var o;null!=(o=n[r])&&(o=String(o))!==String(t[r])&&e.style.setProperty($(r),o)}for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty($(r))}}function R(){this._=t}function _(e,n,r){if(null!=e.events){if(e.events._=t,e.events[n]===r)return;null==r||"function"!=typeof r&&"object"!=typeof r?(null!=e.events[n]&&e.dom.removeEventListener(n.slice(2),e.events,!1),e.events[n]=void 0):(null==e.events[n]&&e.dom.addEventListener(n.slice(2),e.events,!1),e.events[n]=r)}else null==r||"function"!=typeof r&&"object"!=typeof r||(e.events=new R,e.dom.addEventListener(n.slice(2),e.events,!1),e.events[n]=r)}function q(e,t,n){"function"==typeof e.oninit&&l.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(l.bind(e.oncreate,t))}function D(e,t,n){"function"==typeof e.onupdate&&n.push(l.bind(e.onupdate,t))}return R.prototype=Object.create(null),R.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(e,n,r){if(!e)throw new TypeError("DOM element being rendered to does not exist.");if(null!=N&&e.contains(N))throw new TypeError("Node is currently being rendered to and thus is locked.");var o=t,i=N,l=[],s=a(),u=e.namespaceURI;N=e,t="function"==typeof r?r:void 0;try{null==e.vnodes&&(e.textContent=""),n=k.normalizeChildren(Array.isArray(n)?n:[n]),d(e,e.vnodes,n,l,null,"http://www.w3.org/1999/xhtml"===u?void 0:u),e.vnodes=n,null!=s&&a()!==s&&"function"==typeof s.focus&&s.focus();for(var f=0;f<l.length;f++)l[f]()}finally{t=o,N=i}}}("undefined"!=typeof window?window:null),E=n,j=function(e,t,n){var r=[],o=!1,i=-1;function l(){for(i=0;i<r.length;i+=2)try{e(r[i],E(r[i+1]),a)}catch(e){n.error(e)}i=-1}function a(){o||(o=!0,t((function(){o=!1,l()})))}return a.sync=l,{mount:function(t,n){if(null!=n&&null==n.view&&"function"!=typeof n)throw new TypeError("m.mount expects a component, not a vnode.");var o=r.indexOf(t);o>=0&&(r.splice(o,2),o<=i&&(i-=2),e(t,[])),null!=n&&(r.push(t,n),e(t,E(n),a))},redraw:a}}(S,"undefined"!=typeof requestAnimationFrame?requestAnimationFrame:null,"undefined"!=typeof console?console:null),C=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)r(n,e[n]);return t.join("&");function r(e,n){if(Array.isArray(n))for(var o=0;o<n.length;o++)r(e+"["+o+"]",n[o]);else if("[object Object]"===Object.prototype.toString.call(n))for(var o in n)r(e+"["+o+"]",n[o]);else t.push(encodeURIComponent(e)+(null!=n&&""!==n?"="+encodeURIComponent(n):""))}},P=i,z=Object.assign||function(e,t){for(var n in t)P.call(t,n)&&(e[n]=t[n])},T=C,A=z,N=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");if(null==t)return e;var n=e.indexOf("?"),r=e.indexOf("#"),o=r<0?e.length:r,i=n<0?o:n,l=e.slice(0,i),a={};A(a,t);var s=l.replace(/:([^\/\.-]+)(\.{3})?/g,(function(e,n,r){return delete a[n],null==t[n]?e:r?t[n]:encodeURIComponent(String(t[n]))})),u=s.indexOf("?"),f=s.indexOf("#"),c=f<0?s.length:f,d=u<0?c:u,p=s.slice(0,d);n>=0&&(p+=e.slice(n,o)),u>=0&&(p+=(n<0?"?":"&")+s.slice(u,c));var h=T(a);return h&&(p+=(n<0&&u<0?"?":"&")+h),r>=0&&(p+=e.slice(r)),f>=0&&(p+=(r<0?"":"&")+s.slice(f)),p},O=N,I=i,$=g.exports,L=function(e,t,n){var r=0;function o(e){return new t(e)}function i(e){return function(r,i){"string"!=typeof r?(i=r,r=r.url):null==i&&(i={});var l=new t((function(t,n){e(O(r,i.params),i,(function(e){if("function"==typeof i.type)if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]=new i.type(e[n]);else e=new i.type(e);t(e)}),n)}));if(!0===i.background)return l;var a=0;function s(){0==--a&&"function"==typeof n&&n()}return function e(t){var n=t.then;return t.constructor=o,t.then=function(){a++;var r=n.apply(t,arguments);return r.then(s,(function(e){if(s(),0===a)throw e})),e(r)},t}(l)}}function l(e,t){for(var n in e.headers)if(I.call(e.headers,n)&&n.toLowerCase()===t)return!0;return!1}return o.prototype=t.prototype,o.__proto__=t,{request:i((function(t,n,r,o){var i,a=null!=n.method?n.method.toUpperCase():"GET",s=n.body,u=(null==n.serialize||n.serialize===JSON.serialize)&&!(s instanceof e.FormData||s instanceof e.URLSearchParams),f=n.responseType||("function"==typeof n.extract?"":"json"),c=new e.XMLHttpRequest,d=!1,p=!1,h=c,m=c.abort;for(var v in c.abort=function(){d=!0,m.call(this)},c.open(a,t,!1!==n.async,"string"==typeof n.user?n.user:void 0,"string"==typeof n.password?n.password:void 0),u&&null!=s&&!l(n,"content-type")&&c.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof n.deserialize||l(n,"accept")||c.setRequestHeader("Accept","application/json, text/*"),n.withCredentials&&(c.withCredentials=n.withCredentials),n.timeout&&(c.timeout=n.timeout),c.responseType=f,n.headers)I.call(n.headers,v)&&c.setRequestHeader(v,n.headers[v]);c.onreadystatechange=function(e){if(!d&&4===e.target.readyState)try{var i,l=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),a=e.target.response;if("json"===f){if(!e.target.responseType&&"function"!=typeof n.extract)try{a=JSON.parse(e.target.responseText)}catch(e){a=null}}else f&&"text"!==f||null==a&&(a=e.target.responseText);if("function"==typeof n.extract?(a=n.extract(e.target,n),l=!0):"function"==typeof n.deserialize&&(a=n.deserialize(a)),l)r(a);else{var s=function(){try{i=e.target.responseText}catch(e){i=a}var t=new Error(i);t.code=e.target.status,t.response=a,o(t)};0===c.status?setTimeout((function(){p||s()})):s()}}catch(e){o(e)}},c.ontimeout=function(e){p=!0;var t=new Error("Request timed out");t.code=e.target.status,o(t)},"function"==typeof n.config&&(c=n.config(c,n,t)||c)!==h&&(i=c.abort,c.abort=function(){d=!0,i.call(this)}),null==s?c.send():"function"==typeof n.serialize?c.send(n.serialize(s)):s instanceof e.FormData||s instanceof e.URLSearchParams?c.send(s):c.send(JSON.stringify(s))})),jsonp:i((function(t,n,o,i){var l=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+r++,a=e.document.createElement("script");e[l]=function(t){delete e[l],a.parentNode.removeChild(a),o(t)},a.onerror=function(){delete e[l],a.parentNode.removeChild(a),i(new Error("JSONP request failed"))},a.src=t+(t.indexOf("?")<0?"?":"&")+encodeURIComponent(n.callbackKey||"callback")+"="+encodeURIComponent(l),e.document.documentElement.appendChild(a)}))}}("undefined"!=typeof window?window:null,$,j.redraw);function R(e){try{return decodeURIComponent(e)}catch(t){return e}}var _=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var i=t[o].split("="),l=R(i[0]),a=2===i.length?R(i[1]):"";"true"===a?a=!0:"false"===a&&(a=!1);var s=l.split(/\]\[?|\[/),u=r;l.indexOf("[")>-1&&s.pop();for(var f=0;f<s.length;f++){var c=s[f],d=s[f+1],p=""==d||!isNaN(parseInt(d,10));if(""===c)null==n[l=s.slice(0,f).join()]&&(n[l]=Array.isArray(u)?u.length:0),c=n[l]++;else if("__proto__"===c)break;if(f===s.length-1)u[c]=a;else{var h=Object.getOwnPropertyDescriptor(u,c);null!=h&&(h=h.value),null==h&&(u[c]=h=p?[]:{}),u=h}}}return r},q=_,D=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),r=n<0?e.length:n,o=t<0?r:t,i=e.slice(0,o).replace(/\/{2,}/g,"/");return i?("/"!==i[0]&&(i="/"+i),i.length>1&&"/"===i[i.length-1]&&(i=i.slice(0,-1))):i="/",{path:i,params:t<0?{}:q(e.slice(t+1,r))}},M=D,U=i,F=new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$"),H=function(e,t){var n={};if(null!=t)for(var r in e)U.call(e,r)&&!F.test(r)&&t.indexOf(r)<0&&(n[r]=e[r]);else for(var r in e)U.call(e,r)&&!F.test(r)&&(n[r]=e[r]);return n},K=n,Q=d,J=g.exports,B=N,G=D,V=function(e){var t=M(e),n=Object.keys(t.params),r=[],o=new RegExp("^"+t.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,(function(e,t,n){return null==t?"\\"+e:(r.push({k:t,r:"..."===n}),"..."===n?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||""))}))+"$");return function(e){for(var i=0;i<n.length;i++)if(t.params[n[i]]!==e.params[n[i]])return!1;if(!r.length)return o.test(e.path);var l=o.exec(e.path);if(null==l)return!1;for(i=0;i<r.length;i++)e.params[r[i].k]=r[i].r?l[i+1]:decodeURIComponent(l[i+1]);return!0}},X=z,Y=H,Z={};function W(e){try{return decodeURIComponent(e)}catch(t){return e}}var ee=function(e,t){var n,r,o,i,l,a,s=null==e?null:"function"==typeof e.setImmediate?e.setImmediate:e.setTimeout,u=J.resolve(),f=!1,c=!1,d=0,p=Z,h={onbeforeupdate:function(){return!(!(d=d?2:1)||Z===p)},onremove:function(){e.removeEventListener("popstate",y,!1),e.removeEventListener("hashchange",v,!1)},view:function(){if(d&&Z!==p){var e=[K(o,i.key,i)];return p&&(e=p.render(e[0])),e}}},m=w.SKIP={};function v(){f=!1;var s=e.location.hash;"#"!==w.prefix[0]&&(s=e.location.search+s,"?"!==w.prefix[0]&&"/"!==(s=e.location.pathname+s)[0]&&(s="/"+s));var c=s.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,W).slice(w.prefix.length),h=G(c);function v(e){console.error(e),g(r,null,{replace:!0})}X(h.params,e.history.state),function e(s){for(;s<n.length;s++)if(n[s].check(h)){var f=n[s].component,y=n[s].route,w=f,b=a=function(n){if(b===a){if(n===m)return e(s+1);o=null==n||"function"!=typeof n.view&&"function"!=typeof n?"div":n,i=h.params,l=c,a=null,p=f.render?f:null,2===d?t.redraw():(d=2,t.redraw.sync())}};return void(f.view||"function"==typeof f?(f={},b(w)):f.onmatch?u.then((function(){return f.onmatch(h.params,c,y)})).then(b,c===r?null:v):b("div"))}if(c===r)throw new Error("Could not resolve default route "+r+".");g(r,null,{replace:!0})}(0)}function y(){f||(f=!0,s(v))}function g(t,n,r){if(t=B(t,n),c){y();var o=r?r.state:null,i=r?r.title:null;r&&r.replace?e.history.replaceState(o,i,w.prefix+t):e.history.pushState(o,i,w.prefix+t)}else e.location.href=w.prefix+t}function w(o,i,l){if(!o)throw new TypeError("DOM element being rendered to does not exist.");if(n=Object.keys(l).map((function(e){if("/"!==e[0])throw new SyntaxError("Routes must start with a '/'.");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");return{route:e,component:l[e],check:V(e)}})),r=i,null!=i){var a=G(i);if(!n.some((function(e){return e.check(a)})))throw new ReferenceError("Default route doesn't match any known routes.")}"function"==typeof e.history.pushState?e.addEventListener("popstate",y,!1):"#"===w.prefix[0]&&e.addEventListener("hashchange",v,!1),c=!0,t.mount(o,h),v()}return w.set=function(e,t,n){null!=a&&((n=n||{}).replace=!0),a=null,g(e,t,n)},w.get=function(){return l},w.prefix="#!",w.Link={view:function(e){var t,n,r,o=Q(e.attrs.selector||"a",Y(e.attrs,["options","params","selector","onclick"]),e.children);return(o.attrs.disabled=Boolean(o.attrs.disabled))?(o.attrs.href=null,o.attrs["aria-disabled"]="true"):(t=e.attrs.options,n=e.attrs.onclick,r=B(o.attrs.href,e.attrs.params),o.attrs.href=w.prefix+r,o.attrs.onclick=function(e){var o;"function"==typeof n?o=n.call(e.currentTarget,e):null==n||"object"!=typeof n||"function"==typeof n.handleEvent&&n.handleEvent(e),!1===o||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,w.set(r,null,t))}),o}},w.param=function(e){return i&&null!=e?i[e]:i},w}("undefined"!=typeof window?window:null,j),te=y,ne=L,re=j,oe=function(){return te.apply(this,arguments)};oe.m=te,oe.trust=te.trust,oe.fragment=te.fragment,oe.Fragment="[",oe.mount=re.mount,oe.route=ee,oe.render=S,oe.redraw=re.redraw,oe.request=ne.request,oe.jsonp=ne.jsonp,oe.parseQueryString=_,oe.buildQueryString=C,oe.parsePathname=D,oe.buildPathname=N,oe.vnode=n,oe.PromisePolyfill=b,oe.censor=H;var ie=oe,le=ie.Fragment,ae=ie.PromisePolyfill,se=ie.buildPathname,ue=ie.buildQueryString,fe=ie.censor,ce=ie.fragment,de=ie.jsonp,pe=ie.m,he=ie.mount,me=ie.parsePathname,ve=ie.parseQueryString,ye=ie.redraw,ge=ie.render,we=ie.request,be=ie.route,xe=ie.trust,ke=ie.vnode;export{le as Fragment,ae as PromisePolyfill,se as buildPathname,ue as buildQueryString,fe as censor,ie as default,ce as fragment,de as jsonp,pe as m,he as mount,me as parsePathname,ve as parseQueryString,ye as redraw,ge as render,we as request,be as route,xe as trust,ke as vnode};