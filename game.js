/* ========================================
   EXCEL ESCAPE - GAME ENGINE
   ======================================== */

// ── Level Definitions ─────────────────────────
const LEVELS = [
    {
        id: 1,
        title: "The Sum Dungeon",
        story: "The walls are closing in! Add up the numbers to find the escape code!",
        instruction: "Enter a SUM formula in cell B1 to total A1 through A3",
        shortcutTip: "Press ENTER to confirm your formula",
        shortcutLesson: "Enter",
        targetCell: "B1",
        expectedValue: 60,
        timeLimit: 50,
        gridData: { A1: 10, A2: 20, A3: 30 },
        lockedCells: ["A1", "A2", "A3"],
        hint: "Try =SUM(A1:A3)"
    },
    {
        id: 2,
        title: "Average Alley",
        story: "Quick! The spikes are getting closer. Find the average to open the door!",
        instruction: "Enter an AVERAGE formula in cell B1 for cells A1 through A4",
        shortcutTip: "Press TAB to move right, SHIFT+TAB to move left",
        shortcutLesson: "Tab",
        targetCell: "B1",
        expectedValue: 25,
        timeLimit: 45,
        gridData: { A1: 10, A2: 20, A3: 30, A4: 40 },
        lockedCells: ["A1", "A2", "A3", "A4"],
        hint: "Try =AVERAGE(A1:A4)"
    },
    {
        id: 3,
        title: "MAX Mountain",
        story: "Find the highest peak to climb over the walls!",
        instruction: "Use MAX in cell B1 to find the largest value in A1:A5",
        shortcutTip: "Use ARROW KEYS to navigate between cells",
        shortcutLesson: "Arrow Keys",
        targetCell: "B1",
        expectedValue: 88,
        timeLimit: 40,
        gridData: { A1: 15, A2: 42, A3: 88, A4: 7, A5: 63 },
        lockedCells: ["A1", "A2", "A3", "A4", "A5"],
        hint: "Try =MAX(A1:A5)"
    },
    {
        id: 4,
        title: "MIN Mine",
        story: "Dig down to the minimum to find the escape tunnel!",
        instruction: "Use MIN in cell B1 to find the smallest value in A1:A5",
        shortcutTip: "Press DELETE or BACKSPACE to clear a cell",
        shortcutLesson: "Delete",
        targetCell: "B1",
        expectedValue: 3,
        timeLimit: 40,
        gridData: { A1: 22, A2: 3, A3: 45, A4: 17, A5: 9 },
        lockedCells: ["A1", "A2", "A3", "A4", "A5"],
        hint: "Try =MIN(A1:A5)"
    },
    {
        id: 5,
        title: "The IF Inferno",
        story: "The floor is lava! Make the right decision to survive!",
        instruction: 'Enter an IF formula in B1: if A1 > 50, show "PASS", otherwise "FAIL"',
        shortcutTip: "Press ESCAPE to cancel editing a cell",
        shortcutLesson: "Escape",
        targetCell: "B1",
        expectedValue: "PASS",
        timeLimit: 55,
        gridData: { A1: 75 },
        lockedCells: ["A1"],
        hint: '=IF(A1>50,"PASS","FAIL")'
    },
    {
        id: 6,
        title: "COUNT Chamber",
        story: "Count your blessings... and your cells! How many have numbers?",
        instruction: "Use COUNT in B1 to count how many cells in A1:A6 have numbers",
        shortcutTip: "Click the formula bar to edit the current cell's formula",
        shortcutLesson: "Formula Bar",
        targetCell: "B1",
        expectedValue: 4,
        timeLimit: 45,
        gridData: { A1: 5, A2: "", A3: 10, A4: "", A5: 20, A6: 8 },
        lockedCells: ["A1", "A2", "A3", "A4", "A5", "A6"],
        hint: "Try =COUNT(A1:A6)"
    },
    {
        id: 7,
        title: "Multiply or Die",
        story: "Two columns, one answer. Combine their power!",
        instruction: "In C1, multiply A1 by B1. In C2, multiply A2 by B2. Put the sum of C1 and C2 in C3.",
        shortcutTip: "Use simple formulas like =A1*B1 for multiplication",
        shortcutLesson: "Arithmetic",
        targetCell: "C3",
        expectedValue: 170,
        timeLimit: 60,
        gridData: { A1: 5, A2: 12, B1: 10, B2: 10 },
        lockedCells: ["A1", "A2", "B1", "B2"],
        hint: "C1=A1*B1, C2=A2*B2, C3=C1+C2 or =SUM(C1:C2)"
    },
    {
        id: 8,
        title: "CONCAT Crypt",
        story: "Piece together the magic words to unlock the ancient door!",
        instruction: 'Join the text in A1 and B1 with a space between them in cell C1',
        shortcutTip: 'Use & to join text: ="Hello"&" "&"World"',
        shortcutLesson: "& operator",
        targetCell: "C1",
        expectedValue: "OPEN SESAME",
        timeLimit: 50,
        gridData: { A1: "OPEN", B1: "SESAME" },
        lockedCells: ["A1", "B1"],
        hint: '=A1&" "&B1'
    },
    {
        id: 9,
        title: "COUNTIF Cage",
        story: "Only the worthy numbers shall set you free!",
        instruction: 'Use COUNTIF in B1 to count how many cells in A1:A5 are greater than 20',
        shortcutTip: 'COUNTIF criteria uses quotes: ">20"',
        shortcutLesson: "COUNTIF",
        targetCell: "B1",
        expectedValue: 3,
        timeLimit: 50,
        gridData: { A1: 10, A2: 25, A3: 5, A4: 30, A5: 45 },
        lockedCells: ["A1", "A2", "A3", "A4", "A5"],
        hint: '=COUNTIF(A1:A5,">20")'
    },
    {
        id: 10,
        title: "The Final Formula",
        story: "This is it! Use everything you've learned to escape!",
        instruction: "Find the SUM of A1:A5, then in B1 check IF that sum is > 100: show the AVERAGE of A1:A5, otherwise show 0",
        shortcutTip: "You can nest functions: =IF(SUM(...)>100, AVERAGE(...), 0)",
        shortcutLesson: "Nesting",
        targetCell: "B1",
        expectedValue: 30,
        timeLimit: 70,
        gridData: { A1: 10, A2: 20, A3: 30, A4: 40, A5: 50 },
        lockedCells: ["A1", "A2", "A3", "A4", "A5"],
        hint: "=IF(SUM(A1:A5)>100,AVERAGE(A1:A5),0)"
    }
];

// ── Spreadsheet Engine ────────────────────────
class Spreadsheet {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.cells = {};         // { "A1": { raw: "=SUM(A1:A3)", value: 60 }, ... }
        this.selectedCell = null;
        this.editingCell = null;
        this.lockedCells = new Set();
        this.targetCell = null;
        this.undoStack = [];
        this.onCellChange = null;
    }

    init() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const key = this.cellKey(c, r);
                this.cells[key] = { raw: "", value: "" };
            }
        }
    }

    cellKey(col, row) {
        return String.fromCharCode(65 + col) + (row + 1);
    }

    parseCellKey(key) {
        const match = key.match(/^([A-Z])(\d+)$/);
        if (!match) return null;
        return { col: match[1].charCodeAt(0) - 65, row: parseInt(match[2]) - 1 };
    }

    setCell(key, rawValue) {
        if (this.lockedCells.has(key)) return false;
        const prev = this.cells[key]?.raw || "";
        this.undoStack.push({ key, prev });
        if (this.undoStack.length > 50) this.undoStack.shift();

        if (!this.cells[key]) this.cells[key] = { raw: "", value: "" };
        this.cells[key].raw = rawValue;
        this.recalculate();
        if (this.onCellChange) this.onCellChange(key);
        return true;
    }

    getCell(key) {
        return this.cells[key] || { raw: "", value: "" };
    }

    getCellValue(key) {
        return this.cells[key]?.value ?? "";
    }

    undo() {
        if (this.undoStack.length === 0) return;
        const { key, prev } = this.undoStack.pop();
        if (this.cells[key]) {
            this.cells[key].raw = prev;
            this.recalculate();
            if (this.onCellChange) this.onCellChange(key);
        }
    }

    recalculate() {
        // Simple multi-pass recalculation (handles dependencies)
        for (let pass = 0; pass < 3; pass++) {
            for (const key in this.cells) {
                const cell = this.cells[key];
                cell.value = this.evaluate(cell.raw);
            }
        }
    }

    evaluate(formula) {
        if (formula === null || formula === undefined || formula === "") return "";
        const str = String(formula).trim();
        if (!str.startsWith("=")) return this.parseValue(str);

        try {
            let expr = str.substring(1).trim();
            expr = this.processFunctions(expr);
            expr = this.replaceCellRefs(expr);

            // Handle string concatenation with &
            if (expr.includes("&")) {
                return this.evalConcat(expr);
            }

            // Check if result is a quoted string literal (from function returns)
            const strLiteral = expr.match(/^["'](.*)["']$/);
            if (strLiteral) return strLiteral[1];

            // Try numeric evaluation
            const result = this.safeEval(expr);
            if (typeof result === "number") {
                if (!isFinite(result)) return "#DIV/0!";
                return Math.round(result * 1e10) / 1e10; // avoid floating point weirdness
            }
            return result;
        } catch (e) {
            return "#ERROR";
        }
    }

    processFunctions(expr) {
        // Process innermost function calls first (handles nesting)
        const funcRegex = /(SUM|AVERAGE|AVG|MAX|MIN|COUNT|COUNTIF|IF|ABS|ROUND|INT)\(([^()]*)\)/i;
        let maxIter = 20;
        while (funcRegex.test(expr) && maxIter-- > 0) {
            expr = expr.replace(funcRegex, (match, funcName, args) => {
                const result = this.callFunction(funcName.toUpperCase(), args);
                // Wrap string results in quotes so they survive safeEval
                if (typeof result === "string" && isNaN(Number(result)) && !String(result).startsWith("#")) {
                    return '"' + result + '"';
                }
                return String(result);
            });
        }
        return expr;
    }

    callFunction(name, argsStr) {
        switch (name) {
            case "SUM": return this.fnSum(argsStr);
            case "AVERAGE":
            case "AVG": return this.fnAverage(argsStr);
            case "MAX": return this.fnMax(argsStr);
            case "MIN": return this.fnMin(argsStr);
            case "COUNT": return this.fnCount(argsStr);
            case "COUNTIF": return this.fnCountIf(argsStr);
            case "IF": return this.fnIf(argsStr);
            case "ABS": return Math.abs(this.evalArg(argsStr));
            case "ROUND": {
                const parts = this.splitArgs(argsStr);
                return Math.round(this.evalArg(parts[0]));
            }
            case "INT": return Math.floor(this.evalArg(argsStr));
            default: return "#NAME?";
        }
    }

    expandRange(rangeStr) {
        const match = rangeStr.trim().match(/^([A-Z])(\d+):([A-Z])(\d+)$/i);
        if (!match) return [];
        const startCol = match[1].toUpperCase().charCodeAt(0) - 65;
        const startRow = parseInt(match[2]) - 1;
        const endCol = match[3].toUpperCase().charCodeAt(0) - 65;
        const endRow = parseInt(match[4]) - 1;
        const cells = [];
        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                cells.push(this.cellKey(c, r));
            }
        }
        return cells;
    }

    getRangeValues(argsStr) {
        const values = [];
        const parts = this.splitArgs(argsStr);
        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.match(/^[A-Z]\d+:[A-Z]\d+$/i)) {
                const keys = this.expandRange(trimmed);
                for (const k of keys) {
                    const v = this.getCellValue(k);
                    if (v !== "" && v !== null && v !== undefined) values.push(v);
                }
            } else if (trimmed.match(/^[A-Z]\d+$/i)) {
                const v = this.getCellValue(trimmed.toUpperCase());
                if (v !== "" && v !== null && v !== undefined) values.push(v);
            } else {
                const v = this.parseValue(trimmed);
                if (v !== "" && v !== null && v !== undefined) values.push(v);
            }
        }
        return values;
    }

    getNumericValues(argsStr) {
        return this.getRangeValues(argsStr)
            .map(v => parseFloat(v))
            .filter(v => !isNaN(v));
    }

    fnSum(argsStr) {
        return this.getNumericValues(argsStr).reduce((a, b) => a + b, 0);
    }

    fnAverage(argsStr) {
        const vals = this.getNumericValues(argsStr);
        return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }

    fnMax(argsStr) {
        const vals = this.getNumericValues(argsStr);
        return vals.length ? Math.max(...vals) : 0;
    }

    fnMin(argsStr) {
        const vals = this.getNumericValues(argsStr);
        return vals.length ? Math.min(...vals) : 0;
    }

    fnCount(argsStr) {
        const parts = this.splitArgs(argsStr);
        let count = 0;
        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.match(/^[A-Z]\d+:[A-Z]\d+$/i)) {
                const keys = this.expandRange(trimmed);
                for (const k of keys) {
                    const v = this.getCellValue(k);
                    if (v !== "" && v !== null && v !== undefined && !isNaN(parseFloat(v))) {
                        count++;
                    }
                }
            } else if (trimmed.match(/^[A-Z]\d+$/i)) {
                const v = this.getCellValue(trimmed.toUpperCase());
                if (v !== "" && !isNaN(parseFloat(v))) count++;
            }
        }
        return count;
    }

    fnCountIf(argsStr) {
        const parts = this.splitArgs(argsStr);
        if (parts.length < 2) return 0;
        const rangeStr = parts[0].trim();
        let criteria = parts[1].trim().replace(/^["']|["']$/g, "");

        const keys = rangeStr.match(/^[A-Z]\d+:[A-Z]\d+$/i)
            ? this.expandRange(rangeStr)
            : [rangeStr.toUpperCase()];

        let count = 0;
        const compMatch = criteria.match(/^([><=!]+)(.+)$/);
        for (const k of keys) {
            const v = parseFloat(this.getCellValue(k));
            if (isNaN(v)) continue;
            if (compMatch) {
                const op = compMatch[1];
                const target = parseFloat(compMatch[2]);
                if (op === ">" && v > target) count++;
                else if (op === ">=" && v >= target) count++;
                else if (op === "<" && v < target) count++;
                else if (op === "<=" && v <= target) count++;
                else if ((op === "=" || op === "==") && v === target) count++;
                else if ((op === "<>" || op === "!=") && v !== target) count++;
            } else {
                if (v === parseFloat(criteria)) count++;
            }
        }
        return count;
    }

    fnIf(argsStr) {
        const parts = this.splitArgs(argsStr);
        if (parts.length < 3) return "#ERROR";

        let condStr = parts[0].trim();
        // Replace cell refs in condition
        condStr = this.replaceCellRefs(condStr);

        let condResult;
        try {
            condResult = this.safeEval(condStr);
        } catch {
            condResult = false;
        }

        const trueVal = parts[1].trim();
        const falseVal = parts[2].trim();

        const resultStr = condResult ? trueVal : falseVal;
        // Check if it's a string literal
        const strMatch = resultStr.match(/^["'](.*)["']$/);
        if (strMatch) return strMatch[1];
        // Check cell ref
        if (resultStr.match(/^[A-Z]\d+$/i)) {
            return this.getCellValue(resultStr.toUpperCase());
        }
        // Could be a function result (already evaluated) or number
        const num = parseFloat(resultStr);
        return isNaN(num) ? resultStr : num;
    }

    splitArgs(argsStr) {
        // Split by commas, but respect quoted strings
        const args = [];
        let current = "";
        let inQuote = false;
        let quoteChar = "";
        let depth = 0;
        for (const ch of argsStr) {
            if (inQuote) {
                current += ch;
                if (ch === quoteChar) inQuote = false;
            } else if (ch === '"' || ch === "'") {
                inQuote = true;
                quoteChar = ch;
                current += ch;
            } else if (ch === "(") {
                depth++;
                current += ch;
            } else if (ch === ")") {
                depth--;
                current += ch;
            } else if (ch === "," && depth === 0) {
                args.push(current);
                current = "";
            } else {
                current += ch;
            }
        }
        if (current) args.push(current);
        return args;
    }

    replaceCellRefs(expr) {
        return expr.replace(/\b([A-Z])(\d+)\b/gi, (match, col, row) => {
            const key = col.toUpperCase() + row;
            const val = this.getCellValue(key);
            if (val === "" || val === null || val === undefined) return "0";
            if (typeof val === "string" && isNaN(parseFloat(val))) return `"${val}"`;
            return String(val);
        });
    }

    evalConcat(expr) {
        const parts = expr.split("&");
        return parts.map(p => {
            let trimmed = p.trim();
            // Remove surrounding quotes
            const strMatch = trimmed.match(/^["'](.*)["']$/);
            if (strMatch) return strMatch[1];
            // Try cell ref
            if (trimmed.match(/^[A-Z]\d+$/i)) {
                return String(this.getCellValue(trimmed.toUpperCase()));
            }
            const num = parseFloat(trimmed);
            return isNaN(num) ? trimmed : String(num);
        }).join("");
    }

    evalArg(argStr) {
        let s = argStr.trim();
        s = this.replaceCellRefs(s);
        return this.safeEval(s);
    }

    safeEval(expr) {
        // Strict whitelist: digits, math operators, comparison, parens, quoted strings only.
        // No letters allowed at the eval stage. Function names and cell refs must be
        // resolved upstream (processFunctions, replaceCellRefs) into numbers or quoted strings.
        const raw = String(expr);

        // Extract quoted string literals and replace with placeholders so we can
        // tokenize them safely without letting their contents past the whitelist.
        const literals = [];
        const placeholderExpr = raw.replace(/"([^"]*)"|'([^']*)'/g, (m, dq, sq) => {
            const v = dq !== undefined ? dq : sq;
            literals.push(v);
            return String(literals.length - 1);
        });

        // Now the only legal characters are: digits, decimal point, whitespace,
        // arithmetic operators, comparisons, parens, and comma.
        if (!/^[0-9\s+\-*/().,><=!&|]*$/.test(placeholderExpr)) {
            return "#ERROR";
        }

        // If there are string literals, only allow simple equality / inequality
        // comparisons or returning a single literal standalone.
        if (literals.length > 0) {
            const compact = placeholderExpr.replace(/\s/g, "");
            const eqMatch = compact.match(/^([0-9]+)(==?|<>|!=)([0-9]+)$/);
            if (eqMatch) {
                const lhs = literals[parseInt(eqMatch[1], 10)];
                const rhs = literals[parseInt(eqMatch[3], 10)];
                const op = eqMatch[2];
                if (op === "=" || op === "==") return lhs === rhs;
                return lhs !== rhs;
            }
            const lone = compact.match(/^([0-9]+)$/);
            if (lone) return literals[parseInt(lone[1], 10)];
            return "#ERROR";
        }

        try {
            const jsExpr = placeholderExpr
                .replace(/(?<!=)=(?!=)/g, "==")
                .replace(/<>/g, "!=");
            // Number-only expression: safe for Function constructor since whitelist
            // forbids any identifier characters.
            return Function('"use strict"; return (' + jsExpr + ")")();
        } catch {
            return "#ERROR";
        }
    }

    parseValue(str) {
        if (str === null || str === undefined || str === "") return "";
        const trimmed = String(str).trim();
        if (trimmed === "") return "";
        const num = Number(trimmed);
        if (!isNaN(num) && trimmed !== "") return num;
        return trimmed;
    }

    clear() {
        for (const key in this.cells) {
            this.cells[key] = { raw: "", value: "" };
        }
        this.lockedCells.clear();
        this.undoStack = [];
    }
}

// ── UI Controller ─────────────────────────────
class SpreadsheetUI {
    constructor(spreadsheet, tableEl, formulaInput, cellNameEl) {
        this.ss = spreadsheet;
        this.tableEl = tableEl;
        this.formulaInput = formulaInput;
        this.cellNameEl = cellNameEl;
        this.cellEls = {};
        this.editInput = null;
        this.onFormulaConfirmed = null; // callback when user confirms a formula
    }

    render() {
        this.tableEl.innerHTML = "";
        this.cellEls = {};

        // Header row
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = '<th></th>';
        for (let c = 0; c < this.ss.cols; c++) {
            const th = document.createElement("th");
            th.textContent = String.fromCharCode(65 + c);
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        this.tableEl.appendChild(thead);

        // Data rows
        const tbody = document.createElement("tbody");
        for (let r = 0; r < this.ss.rows; r++) {
            const tr = document.createElement("tr");
            const rowHeader = document.createElement("td");
            rowHeader.className = "row-header";
            rowHeader.textContent = r + 1;
            tr.appendChild(rowHeader);

            for (let c = 0; c < this.ss.cols; c++) {
                const key = this.ss.cellKey(c, r);
                const td = document.createElement("td");
                td.dataset.cell = key;
                td.dataset.col = c;
                td.dataset.row = r;

                const content = document.createElement("span");
                content.className = "cell-content";
                td.appendChild(content);

                this.cellEls[key] = td;

                if (this.ss.lockedCells.has(key)) td.classList.add("locked");
                if (this.ss.targetCell === key) td.classList.add("target-cell");

                td.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    this.selectCell(key);
                });
                td.addEventListener("dblclick", () => this.startEditing(key));

                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.tableEl.appendChild(tbody);

        this.refreshValues();

        // Select A1 or target cell by default
        const defaultCell = this.ss.targetCell || "A1";
        this.selectCell(defaultCell);
    }

    refreshValues() {
        for (const key in this.cellEls) {
            const td = this.cellEls[key];
            const content = td.querySelector(".cell-content");
            const cell = this.ss.getCell(key);
            const displayVal = cell.value !== null && cell.value !== undefined ? cell.value : "";
            content.textContent = displayVal;
        }
    }

    selectCell(key) {
        if (this.ss.editingCell) {
            this.finishEditing(true);
        }

        if (this.ss.selectedCell && this.cellEls[this.ss.selectedCell]) {
            this.cellEls[this.ss.selectedCell].classList.remove("selected");
        }

        this.ss.selectedCell = key;
        if (this.cellEls[key]) {
            this.cellEls[key].classList.add("selected");
        }

        this.cellNameEl.textContent = key;
        const cell = this.ss.getCell(key);
        this.formulaInput.value = cell.raw || "";
    }

    startEditing(key) {
        if (this.ss.lockedCells.has(key)) return;
        if (this.ss.editingCell) this.finishEditing(true);

        this.selectCell(key);
        this.ss.editingCell = key;

        const td = this.cellEls[key];
        td.classList.add("editing");

        const input = document.createElement("input");
        input.type = "text";
        input.className = "cell-editor";
        input.value = this.ss.getCell(key).raw || "";
        input.spellcheck = false;
        td.appendChild(input);
        input.focus();

        this.editInput = input;
        this.formulaInput.value = input.value;

        input.addEventListener("input", () => {
            this.formulaInput.value = input.value;
        });

        input.addEventListener("keydown", (e) => this.handleEditKeydown(e, key));
    }

    startEditingFromType(key, char) {
        if (this.ss.lockedCells.has(key)) return;
        this.startEditing(key);
        if (this.editInput) {
            this.editInput.value = char;
            this.formulaInput.value = char;
        }
    }

    finishEditing(commit = true) {
        if (!this.ss.editingCell) return;
        const key = this.ss.editingCell;
        const td = this.cellEls[key];

        if (commit && this.editInput) {
            this.ss.setCell(key, this.editInput.value);
        }

        td.classList.remove("editing");
        const editor = td.querySelector(".cell-editor");
        if (editor) editor.remove();

        this.ss.editingCell = null;
        this.editInput = null;

        this.refreshValues();
        this.formulaInput.value = this.ss.getCell(key).raw || "";

        // Auto-check when formula is confirmed on target cell
        if (commit && key === this.ss.targetCell && this.onFormulaConfirmed) {
            setTimeout(() => this.onFormulaConfirmed(), 50);
        }
    }

    handleEditKeydown(e, key) {
        const pos = this.ss.parseCellKey(key);
        if (!pos) return;

        if (e.key === "Enter") {
            e.preventDefault();
            this.finishEditing(true);
            // Move down
            if (pos.row < this.ss.rows - 1) {
                this.selectCell(this.ss.cellKey(pos.col, pos.row + 1));
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            this.finishEditing(true);
            if (e.shiftKey) {
                if (pos.col > 0) this.selectCell(this.ss.cellKey(pos.col - 1, pos.row));
            } else {
                if (pos.col < this.ss.cols - 1) this.selectCell(this.ss.cellKey(pos.col + 1, pos.row));
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            this.finishEditing(false);
        }
    }

    moveSelection(dCol, dRow) {
        if (!this.ss.selectedCell) return;
        const pos = this.ss.parseCellKey(this.ss.selectedCell);
        if (!pos) return;
        const newCol = Math.max(0, Math.min(this.ss.cols - 1, pos.col + dCol));
        const newRow = Math.max(0, Math.min(this.ss.rows - 1, pos.row + dRow));
        this.selectCell(this.ss.cellKey(newCol, newRow));
    }

    flashCell(key, className) {
        const td = this.cellEls[key];
        if (!td) return;
        td.classList.add(className);
        setTimeout(() => td.classList.remove(className), 600);
    }
}

// ── Game Engine ───────────────────────────────
class Game {
    constructor() {
        this.currentLevel = 0;
        this.score = 0;
        this.timeLeft = 0;
        this.timerInterval = null;
        this.wallAnimFrame = null;
        this.isRunning = false;
        this.wallProgress = 0; // 0 to 1

        // DOM elements
        this.els = {
            startScreen: document.getElementById("start-screen"),
            gameScreen: document.getElementById("game-screen"),
            startBtn: document.getElementById("start-btn"),
            roomTitle: document.getElementById("room-title"),
            roomNum: document.getElementById("room-num"),
            timeLeft: document.getElementById("time-left"),
            timerDisplay: document.getElementById("timer-display"),
            scoreVal: document.getElementById("score-val"),
            challengeText: document.getElementById("challenge-text"),
            shortcutTip: document.getElementById("shortcut-tip"),
            leftWall: document.getElementById("left-wall"),
            rightWall: document.getElementById("right-wall"),
            character: document.getElementById("character"),
            door: document.getElementById("door"),
            doorLock: document.getElementById("door-lock"),
            keyPopup: document.getElementById("key-popup"),
            dangerOverlay: document.getElementById("danger-overlay"),
            formulaInput: document.getElementById("formula-input"),
            cellName: document.getElementById("cell-name"),
            spreadsheetTable: document.getElementById("spreadsheet"),
            checkBtn: document.getElementById("check-btn"),
            feedbackMsg: document.getElementById("feedback-msg"),
            modalOverlay: document.getElementById("modal-overlay"),
            modalIcon: document.getElementById("modal-icon"),
            modalTitle: document.getElementById("modal-title"),
            modalMessage: document.getElementById("modal-message"),
            modalStats: document.getElementById("modal-stats"),
            statTime: document.getElementById("stat-time"),
            statRoom: document.getElementById("stat-room"),
            modalBtn: document.getElementById("modal-btn"),
        };

        // Create spreadsheet
        this.ss = new Spreadsheet(5, 7);
        this.ss.init();
        this.ui = new SpreadsheetUI(
            this.ss,
            this.els.spreadsheetTable,
            this.els.formulaInput,
            this.els.cellName
        );

        // Auto-check when formula is confirmed on target cell
        this.ui.onFormulaConfirmed = () => this.checkAnswer();

        this.bindEvents();
    }

    bindEvents() {
        this.els.startBtn.addEventListener("click", () => this.startGame());
        this.els.checkBtn.addEventListener("click", () => this.checkAnswer());
        this.els.modalBtn.addEventListener("click", () => this.handleModalAction());

        // Keyboard handler
        document.addEventListener("keydown", (e) => this.handleKeydown(e));

        // Formula bar editing
        this.els.formulaInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const key = this.ss.selectedCell;
                if (key && !this.ss.lockedCells.has(key)) {
                    this.ss.setCell(key, this.els.formulaInput.value);
                    this.ui.refreshValues();
                    // Auto-check if this was the target cell
                    if (key === this.ss.targetCell) {
                        setTimeout(() => this.checkAnswer(), 50);
                    } else {
                        // Move down
                        const pos = this.ss.parseCellKey(key);
                        if (pos && pos.row < this.ss.rows - 1) {
                            this.ui.selectCell(this.ss.cellKey(pos.col, pos.row + 1));
                        }
                    }
                }
            } else if (e.key === "Escape") {
                e.preventDefault();
                this.els.formulaInput.value = this.ss.getCell(this.ss.selectedCell).raw || "";
                this.els.formulaInput.blur();
            }
        });

        this.els.formulaInput.addEventListener("focus", () => {
            // Sync formula bar with cell editing
        });
    }

    handleKeydown(e) {
        if (!this.isRunning) return;
        // Don't handle if modal is open
        if (!this.els.modalOverlay.classList.contains("hidden")) return;
        // Don't handle if formula bar is focused
        if (document.activeElement === this.els.formulaInput) return;

        // If editing, let the cell editor handle it
        if (this.ss.editingCell) return;

        // Ctrl+Z: Undo
        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
            e.preventDefault();
            this.ss.undo();
            this.ui.refreshValues();
            if (this.ss.selectedCell) {
                this.els.formulaInput.value = this.ss.getCell(this.ss.selectedCell).raw || "";
            }
            return;
        }

        // Navigation
        if (e.key === "ArrowUp") { e.preventDefault(); this.ui.moveSelection(0, -1); return; }
        if (e.key === "ArrowDown") { e.preventDefault(); this.ui.moveSelection(0, 1); return; }
        if (e.key === "ArrowLeft") { e.preventDefault(); this.ui.moveSelection(-1, 0); return; }
        if (e.key === "ArrowRight") { e.preventDefault(); this.ui.moveSelection(1, 0); return; }
        if (e.key === "Tab") {
            e.preventDefault();
            this.ui.moveSelection(e.shiftKey ? -1 : 1, 0);
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            if (this.ss.selectedCell) {
                this.ui.startEditing(this.ss.selectedCell);
            }
            return;
        }

        // Delete/Backspace to clear cell
        if (e.key === "Delete" || e.key === "Backspace") {
            e.preventDefault();
            if (this.ss.selectedCell && !this.ss.lockedCells.has(this.ss.selectedCell)) {
                this.ss.setCell(this.ss.selectedCell, "");
                this.ui.refreshValues();
                this.els.formulaInput.value = "";
            }
            return;
        }

        // F2 to edit
        if (e.key === "F2") {
            e.preventDefault();
            if (this.ss.selectedCell) {
                this.ui.startEditing(this.ss.selectedCell);
            }
            return;
        }

        // Typing starts editing
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (this.ss.selectedCell) {
                e.preventDefault();
                this.ui.startEditingFromType(this.ss.selectedCell, e.key);
            }
        }
    }

    startGame() {
        this.currentLevel = 0;
        this.score = 0;
        this.els.scoreVal.textContent = "0";
        this.els.startScreen.classList.add("hidden");
        this.els.gameScreen.classList.remove("hidden");
        this.loadLevel(0);
    }

    loadLevel(index) {
        if (index >= LEVELS.length) {
            this.showVictory();
            return;
        }

        this.currentLevel = index;
        const level = LEVELS[index];

        // Reset UI
        this.els.roomTitle.textContent = level.title;
        this.els.roomNum.textContent = level.id;
        this.els.challengeText.textContent = level.instruction;
        this.els.shortcutTip.textContent = level.shortcutTip;
        this.els.feedbackMsg.textContent = "";
        this.els.feedbackMsg.className = "";
        this.els.timerDisplay.className = "timer-display";
        this.els.character.className = "";
        this.els.door.className = "";
        this.els.doorLock.textContent = "\u{1F512}";
        this.els.keyPopup.classList.add("hidden");
        this.els.dangerOverlay.className = "";

        // Reset walls
        this.wallProgress = 0;
        this.updateWalls(0);

        // Setup spreadsheet
        this.ss.clear();
        this.ss.init();
        this.ss.targetCell = level.targetCell;

        // Load grid data
        for (const [key, val] of Object.entries(level.gridData)) {
            this.ss.cells[key] = { raw: String(val), value: this.ss.parseValue(val) };
        }

        // Set locked cells
        for (const key of level.lockedCells) {
            this.ss.lockedCells.add(key);
        }

        this.ss.recalculate();
        this.ui.render();

        // Start timer
        this.timeLeft = level.timeLimit;
        this.els.timeLeft.textContent = this.timeLeft;
        this.isRunning = true;

        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.tick(), 1000);

        // Start wall animation
        this.startWallAnimation(level.timeLimit);
    }

    tick() {
        if (!this.isRunning) return;
        this.timeLeft--;
        this.els.timeLeft.textContent = Math.max(0, this.timeLeft);

        const level = LEVELS[this.currentLevel];
        const pct = 1 - (this.timeLeft / level.timeLimit);

        // Danger states
        if (pct > 0.8) {
            this.els.timerDisplay.className = "timer-display critical";
            this.els.character.className = "panic";
            this.els.dangerOverlay.className = "critical";
        } else if (pct > 0.6) {
            this.els.timerDisplay.className = "timer-display danger";
            this.els.character.className = "panic";
            this.els.dangerOverlay.className = "active";
        }

        if (this.timeLeft <= 0) {
            this.gameOver();
        }
    }

    startWallAnimation(duration) {
        const startTime = Date.now();
        const totalMs = duration * 1000;

        const animate = () => {
            if (!this.isRunning) return;
            const elapsed = Date.now() - startTime;
            this.wallProgress = Math.min(elapsed / totalMs, 1);
            this.updateWalls(this.wallProgress);
            if (this.wallProgress < 1) {
                this.wallAnimFrame = requestAnimationFrame(animate);
            }
        };
        this.wallAnimFrame = requestAnimationFrame(animate);
    }

    updateWalls(progress) {
        // Walls move from off-screen to meeting in middle
        // At progress=0, walls are at -100% (hidden)
        // At progress=1, walls are at ~40% from their side (crushing character)
        const leftX = -100 + progress * 140; // from -100% to +40%
        const rightX = 100 - progress * 140;  // from +100% to -40%

        this.els.leftWall.style.transform = `translateX(${leftX}%)`;
        this.els.rightWall.style.transform = `translateX(${rightX}%)`;
    }

    checkAnswer() {
        if (!this.isRunning) return;
        const level = LEVELS[this.currentLevel];
        const cellVal = this.ss.getCellValue(level.targetCell);

        let correct = false;
        if (typeof level.expectedValue === "string") {
            correct = String(cellVal).trim().toUpperCase() === level.expectedValue.toUpperCase();
        } else {
            correct = Math.abs(Number(cellVal) - level.expectedValue) < 0.01;
        }

        if (correct) {
            this.levelComplete();
        } else {
            this.els.feedbackMsg.textContent = `Not quite! Expected: ${level.expectedValue}. Hint: ${level.hint}`;
            this.els.feedbackMsg.className = "error";
            // Shake the check button
            this.els.checkBtn.style.animation = "panic 0.3s ease-in-out";
            setTimeout(() => { this.els.checkBtn.style.animation = ""; }, 300);
        }
    }

    levelComplete() {
        this.isRunning = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.wallAnimFrame) cancelAnimationFrame(this.wallAnimFrame);

        const level = LEVELS[this.currentLevel];

        // Score calculation
        const timeBonus = Math.round(this.timeLeft * 10);
        const roomScore = 100 + timeBonus;
        this.score += roomScore;
        this.els.scoreVal.textContent = this.score;

        // Animate success
        this.els.character.className = "celebrate";
        this.els.dangerOverlay.className = "";
        this.els.timerDisplay.className = "timer-display";

        // Flash target cell
        this.ui.flashCell(level.targetCell, "cell-correct");

        // Retract walls
        this.animateWallRetract();

        // Show key
        setTimeout(() => {
            this.els.keyPopup.classList.remove("hidden");
        }, 400);

        // Open door
        setTimeout(() => {
            this.els.keyPopup.classList.add("hidden");
            this.els.door.classList.add("open");
            this.els.doorLock.textContent = "\u{1F513}";
        }, 1200);

        // Character walks to door
        setTimeout(() => {
            this.els.character.className = "walking";
        }, 1600);

        // Show modal
        setTimeout(() => {
            this.showLevelCompleteModal(roomScore, timeBonus);
        }, 2400);
    }

    animateWallRetract() {
        const startProgress = this.wallProgress;
        const startTime = Date.now();
        const duration = 800;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            const progress = startProgress * (1 - eased);
            this.updateWalls(progress);
            if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    showLevelCompleteModal(roomScore, timeBonus) {
        const level = LEVELS[this.currentLevel];
        this.els.modalIcon.textContent = "\u{1F511}";
        this.els.modalTitle.textContent = "Room Cleared!";
        this.els.modalMessage.textContent = `You escaped "${level.title}"! Shortcut learned: ${level.shortcutLesson}`;
        this.els.modalStats.classList.remove("hidden");
        this.els.statTime.textContent = `+${timeBonus}`;
        this.els.statRoom.textContent = `+${roomScore}`;

        if (this.currentLevel < LEVELS.length - 1) {
            this.els.modalBtn.textContent = "Next Room \u{27A1}";
        } else {
            this.els.modalBtn.textContent = "See Results \u{1F3C6}";
        }

        this.els.modalOverlay.classList.remove("hidden");
        this.modalAction = "next";
    }

    gameOver() {
        this.isRunning = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.wallAnimFrame) cancelAnimationFrame(this.wallAnimFrame);

        this.els.character.className = "panic";

        // Fully close walls
        this.updateWalls(1);

        setTimeout(() => {
            const level = LEVELS[this.currentLevel];
            this.els.modalIcon.textContent = "\u{1F480}";
            this.els.modalTitle.textContent = "Crushed!";
            this.els.modalMessage.textContent = `The walls got you in "${level.title}"! The answer was: ${level.hint}`;
            this.els.modalStats.classList.add("hidden");
            this.els.modalBtn.textContent = "Try Again \u{1F504}";
            this.els.modalOverlay.classList.remove("hidden");
            this.modalAction = "retry";
        }, 600);
    }

    showVictory() {
        this.els.modalIcon.textContent = "\u{1F3C6}";
        this.els.modalTitle.textContent = "You Escaped!";
        this.els.modalMessage.textContent = `You conquered all 10 rooms! Final Score: ${this.score}. You're now a spreadsheet master!`;
        this.els.modalStats.classList.add("hidden");
        this.els.modalBtn.textContent = "Play Again \u{1F504}";
        this.els.modalOverlay.classList.remove("hidden");
        this.modalAction = "restart";
    }

    handleModalAction() {
        this.els.modalOverlay.classList.add("hidden");

        if (this.modalAction === "next") {
            this.loadLevel(this.currentLevel + 1);
        } else if (this.modalAction === "retry") {
            this.loadLevel(this.currentLevel);
        } else if (this.modalAction === "restart") {
            this.score = 0;
            this.els.scoreVal.textContent = "0";
            this.loadLevel(0);
        }
    }
}

// ── Initialize ────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    new Game();
});
