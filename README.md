# bloom

## concept

- based on bloom sort mechanics
- ~simplest ui possible with svg mithril rendering~ using canvas

## how to use

- statically serve the root folder with something like

    http-server . -p 8080 -c-1 --cors &

## TODO

- logic
    - main algorithm
        - if there's a path of 3 neighbor flowers with the same color, original game always transfers flowers between them through the center one
        - [maybe fixed?] no use transferring between flowers ad eternum (how to identify an irrelevant sequence?)
    - drag and drop has a bug. sometimes fails and draws the flower out of place
    - improve flower/board generation progression
    - implement: double flowers...
    - boosters:
        - reshuffle flowers on board
        - order a row
        - order a column
        - paint 1 flower blue
        - complete up to 9 flowers
    - butterfly... (after n points, randomize a booster)
- visuals
    - (not very relevant at all) show score label where it increases (~ +20XP)

## aux

- https://yqnn.github.io/svg-path-editor/
- https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
