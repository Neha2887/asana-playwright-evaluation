# Asana-like demo: data-driven Playwright evaluation

TypeScript-only test code covering the six required scenarios. The JSON object in `data/scenarios.json` drives project, column, task title, and expected tags. One shared test body generates six independently reported tests.

## Run locally (Node.js 22 or later)

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm test
npm run report
```

For Linux, use `npx playwright install --with-deps chromium` if browser system dependencies are missing. Use `npm run test:headed` to watch execution or `npm run test:ui` to debug interactively.

## Structure

- `data/scenarios.json`: public demo credentials and all six acceptance cases.
- `pages/LoginPage.ts`: label-based login and successful-login assertions.
- `pages/BoardPage.ts`: project navigation, column-scoped task lookup, and exact tag-set checks.
- `tests/board.spec.ts`: reusable login hook and one test generated per JSON entry.
- `playwright.config.ts`: Chromium, isolation, parallel execution, HTML report, and failure artifacts.
- `.github/workflows/playwright.yml`: installation, type checking, tests, and report upload on push/PR.
- `WALKTHROUGH.md`: a 2–3 minute recording guide.
- `VALIDATION.md`: the actual verification performed and any remaining limitations.

Each test receives a fresh browser context and logs in through the UI. No stored login state bypasses the required login step. The prompt calls the login identifier email; the app labels it **Username** and accepts `admin`.

The column assertion includes its displayed task count, but does not hardcode that count. Task lookup is scoped to the expected column. Tag checks are scoped to the exact task card and reject missing, extra, or duplicate tags while allowing badge order to vary. Auto-waiting assertions are used without fixed sleeps. Column/card parent locators and the tag badge class are centralized in the page object because the demo does not provide semantic container roles or test IDs.

## Adding cases

Add a new object to `scenarios` with a unique `id`, `project`, `column`, `task`, and `tags`. No test-body change is required. Playwright's parameterized-test documentation: https://playwright.dev/docs/test-parameterize

## Configuration

Optional environment variables: `BASE_URL`, `DEMO_USERNAME`, and `DEMO_PASSWORD`. The defaults target the supplied demo. These are published demo credentials only; do not put real account secrets in JSON.

Retries are disabled so a failing evaluation remains visible. Failure screenshots, traces, and videos are retained under `test-results/`; the HTML report is under `playwright-report/`. Those generated folders are excluded from Git.

## Submission

Public repository: https://github.com/Neha2887/asana-playwright-evaluation

Review the Actions result and rerun the checks locally before submitting this URL in the Google form. Record a 2–3 minute screen-and-voice walkthrough using `WALKTHROUGH.md`, then upload your recording to the form. Playwright failure videos are debugging artifacts, not the requested narrated walkthrough.
