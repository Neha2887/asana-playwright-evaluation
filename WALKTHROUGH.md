# 2–3 minute video walkthrough

Record your own screen and voice. Open the project in your editor and have the test result available. Read this once, then explain it naturally. Only say that the tests passed after your local run confirms it.

## 0:00–0:20 — Introduction (show README)

“Hi, I'm Neha. This is my TypeScript Playwright solution for the Asana-like demo application. I used a data-driven structure so the six required scenarios share the same test logic, and future scenarios can be added without duplicating tests.”

## 0:20–0:55 — Data (show data/scenarios.json)

“This JSON object contains the public demo login credentials and the scenario data. Each case has a unique ID, project name, expected column, task title, and expected tags. For example, user authentication belongs in Web Application's To Do column with Feature and High Priority. Offline mode belongs in Mobile Application's In Progress column with the same two tags.”

## 0:55–1:25 — Execution (show tests/board.spec.ts and LoginPage.ts)

“The loop generates a separate Playwright test for each JSON entry, so each scenario gets its own result. The beforeEach hook logs in through the UI for every test. Playwright gives each test an isolated browser context. I use the app's actual Username and Password labels, submit Sign in, and verify that Logout and the project navigation are visible.”

## 1:25–2:00 — Assertions (show BoardPage.ts)

“The page object selects the project and checks its header. It then locates the expected column and searches for the exact task title inside that column. This prevents a task in the wrong column from passing. Tag checks happen inside that task card. I verify each tag is visible and compare the complete tag set, so an extra or missing tag fails too. I use auto-waiting assertions rather than fixed delays. The few DOM-dependent selectors are kept together here.”

## 2:00–2:30 — Quality and result (show terminal/report and workflow)

“The configuration runs Chromium and keeps screenshots, traces, and videos on failure. The GitHub Actions workflow installs the locked dependencies, checks TypeScript, runs the tests, and uploads the report. To demonstrate, I run npm run typecheck and npm test, then open the HTML report.”

Show and describe the actual result. If it passes: “All six scenarios passed in this run.” If it fails, investigate and rerun before submitting.

## 2:30–2:45 — Scalability (return to JSON)

“To add another board scenario, I only add another JSON entry. The shared login, navigation, and assertions remain reusable. This keeps the suite small and maintainable while preserving clear, individual test results.”
