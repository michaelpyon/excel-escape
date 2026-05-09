# Excel Escape: Formula Dungeon

A puzzle game where you solve spreadsheet formula challenges before the spike walls crush you. 10 rooms, escalating difficulty, no build step.

Live: https://excel-escape.vercel.app/

## How to play

1. Open the page in a desktop browser (keyboard required).
2. Read the room's challenge ("Enter a SUM formula in B1...").
3. Click the target cell (highlighted yellow), type your formula, press Enter.
4. Beat the timer before the walls close in.

Keyboard shortcuts mirror real spreadsheets: arrow keys, Tab, Enter, F2 to edit, Delete to clear, Ctrl/Cmd+Z to undo.

## Project structure

```
index.html   markup, meta tags, mobile gate
style.css    visuals, animations, dungeon scene
game.js      formula engine + game loop
og.png       1200x630 social preview
```

No frameworks, no bundler, no dependencies. Open `index.html` directly or serve the folder with any static server.

## Supported formulas

The formula engine implements a focused subset of spreadsheet syntax:

- `SUM(range)`, `AVERAGE(range)` (alias `AVG`)
- `MAX(range)`, `MIN(range)`
- `COUNT(range)`, `COUNTIF(range, criteria)` where criteria is `">20"`, `"<=5"`, `"=10"`, etc.
- `IF(condition, trueValue, falseValue)`
- `ABS(x)`, `ROUND(x)`, `INT(x)`
- Cell references: `A1`, `B2`, etc. Ranges: `A1:A5`.
- Text concatenation with `&`: `=A1&" "&B1`.
- Nested calls: `=IF(SUM(A1:A5)>100, AVERAGE(A1:A5), 0)`.

Errors return `#ERROR` or `#DIV/0!` rather than crashing.

## Adding a new puzzle

Open `game.js` and append to the `LEVELS` array. Each level is a plain object:

```js
{
    id: 11,
    title: "Your Room Name",
    story: "Flavor text shown in the modal.",
    instruction: "What the player needs to do, plain language.",
    shortcutTip: "Tip surfaced in the shortcut badge.",
    shortcutLesson: "Name of the spreadsheet skill they just learned",
    targetCell: "B1",
    expectedValue: 42,           // number or string
    timeLimit: 50,               // seconds
    gridData: { A1: 10, A2: 32 },// pre-filled cells
    lockedCells: ["A1", "A2"],   // cells the player can't edit
    hint: "=SUM(A1:A2)"          // shown on wrong answer + game over
}
```

The grid is 5 columns by 7 rows (`A1:E7`). Numbers and strings both work. The check passes when `targetCell` evaluates within `0.01` of `expectedValue` (numbers) or matches case-insensitively (strings).

## Security notes

The formula evaluator strips identifier characters before any `Function` constructor call. Quoted strings get extracted to placeholders and only flow back through equality comparisons or as standalone return values. Inputs like `=alert(1)` or `=window.location` resolve to `#ERROR`.

## Deploy

This project is linked to Vercel via `.vercel/project.json`. To deploy:

```bash
npx vercel --prod
```

Static site, no build step, no env vars.
