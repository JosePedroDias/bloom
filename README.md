# bloom

## concept

- based on bloom sort mechanics
- simplest ui possible with svg mithril rendering

## how to use

- statically serve the root folder with something like

    http-server . -p 8080 -c-1 --cors &

## TODO

- logic
    - if having to discard a petal, send it to a neighbor having it (currently that isn't checked)
    - avoid endless petal transfer loops
    - improve flower/board generation progression
- visuals
    - show score label where it increases (~ +20XP)

## aux

- https://yqnn.github.io/svg-path-editor/
