# Excel Escape: Suggestions and Findings

## Evangelist Persona

**Who:** A mid-level analyst or operations person (25-35) who lives in spreadsheets daily. They know SUM, AVERAGE, and IF cold, but just leveled up to VLOOKUP and feel proud about it. They hang out in r/excel, r/spreadsheets, and #excel channels on work Slack. They currently use static YouTube tutorials or Google to learn formulas. What makes them screenshot it: finishing VLOOKUP Vault and sharing "I escaped the Formula Dungeon in 4m 12s with a score of 1340. Can you beat it?" to their work Slack. What makes them bounce in 5 seconds: seeing only SUM/AVERAGE puzzles and thinking "too easy, this is for beginners."

---

## Ground Truth (Repo HEAD, checked 2026-05-30)

### What is working and honest

- Static no-build app. No fabricated data, no live/real-time claims, no fake API calls. All puzzles use explicit hardcoded numeric values.
- Formula engine is real: evaluates SUM, AVERAGE, MAX, MIN, COUNT, COUNTIF, IF, ABS, ROUND, INT, CONCAT via the `&` operator. Security: `safeEval` uses a strict character whitelist before any `Function` constructor call, with string literals extracted to placeholders. `=alert(1)` returns `#ERROR`.
- Mobile gate is functional: `@media (max-width: 768px)` hides the app and shows a "Copy Link for Desktop" button.
- Victory modal shows Total Time and Final Score (fixed in prior pass, confirmed in HEAD at `showVictory()`).
- Share buttons: "Copy result" copies `"I escaped the Formula Dungeon in Xm Ys with a score of N. Can you beat it? https://excel-escape.vercel.app"`. "Share on X" opens a Twitter intent. Both wired correctly.
- Room-modal stat labels reset on replay (stat rows relabeled back to "Time Bonus:" and "Room Score:" in `showLevelCompleteModal`).

### What was missing before this pass

- **VLOOKUP absent.** The original 10 rooms top out at nested IF/SUM/AVERAGE. The single formula that r/excel power users flex, VLOOKUP, was not present and was flagged in the prior pass as the top deferred bet. The engine had no VLOOKUP implementation.

### Live vs. Repo

The Vercel live URL at https://excel-escape.vercel.app appears to already serve the post-prior-pass build (share buttons, score stats visible). Repo HEAD and live appear in sync. If they differ after this push, that is a deploy-needed item only.

---

## Shipped

### Wave 1
- **VLOOKUP engine + Room 11 (VLOOKUP Vault):** Added `fnVlookup` to Spreadsheet class, registered in `processFunctions` and `callFunction`, added room 11 price-lookup scenario. Share text now reads "11/11 rooms cleared."

### Wave 2
- **Two-strike wrong-answer feedback:** First wrong guess shows "Not quite, try again!" without spoiling the answer. Second and subsequent wrong guesses reveal the expected value and hint formula. `wrongAttempts` counter resets in `loadLevel`. Files: `game.js`.

---

## Prioritized Plan

### Quick Wins

1. ~~**Add VLOOKUP to engine + Room 11 (VLOOKUP Vault)**~~ DONE (wave 1)

2. ~~**Soften the wrong-answer feedback message**~~ DONE (wave 2)

3. **Timer persists across room modal** [S]
   When the inter-room modal is open, the game timer is stopped. But `isRunning = false` is only set in `levelComplete`. If a user is slow to click "Next Room," their run time inflates. Total run time includes modal-reading time. Low impact but affects score fairness.
   Files: `game.js` (track modal pause time and subtract from runStartTime offset).

4. **Room 7 multi-cell ambiguity** [S]
   "Multiply or Die" asks the player to fill C1, C2, AND C3 but only checks C3. A player can skip the intermediate steps with `=A1*B1+A2*B2` directly in C3 (result: 170, correct). The shortcutLesson "Arithmetic" could be more specific. Minor: the instruction says to fill 3 cells but one correct formula in C3 bypasses the lesson intent.
   Files: `game.js` (either relax the instruction wording or add a multi-target check).

5. **Formula engine: IFERROR wrapper** [S, nice-to-have]
   Expert users habitually wrap VLOOKUP in IFERROR. Without IFERROR in the engine, typing `=IFERROR(VLOOKUP(C1,A1:B5,2,0),"not found")` will return `#NAME?`. Not critical for room 11 (the hint does not use IFERROR) but would make the engine feel more complete.
   Files: `game.js` (add fnIferror, register in funcRegex and callFunction).

### Bigger Bets (multi-day)

- **INDEX-MATCH room (Room 12).** Requires adding fnIndex and fnMatch to the engine. INDEX-MATCH is the "pro" alternative to VLOOKUP in r/excel culture. One hard final room would give advanced users something genuinely brag-worthy.
- **Full mobile-first rewrite.** The desktop gate is intentional (keyboard required), but a touch-friendly virtual keyboard overlay could open the game to mobile. Multi-day, out of scope for this tier.
- **Leaderboard.** A simple Supabase or Val.town backend to store top scores by run time. Adds competitive sharing incentive. Multi-day.
