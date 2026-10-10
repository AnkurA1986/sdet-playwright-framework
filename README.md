# MediShop Playwright framework (TypeScript)

SDET-style layout: **tests describe intent; the framework knows how.**

## Structure

| Path | Role |
| --- | --- |
| `src/` | Reusable framework — pages, base classes, config, fixtures, reporters |
| `tests/` | Specs and `expect()` only |
| `test-data/` | JSON test data |

## Prerequisites

- Node.js (LTS)
- `npm ci`

## Environment

Copy `.env.example` to `.env` (optional) or set variables in the shell:

| Variable | Default |
| --- | --- |
| `BASE_URL` | `https://www.way2automation.com/MediShopWebApp/` |
| `HEADLESS` | `false` locally; `true` when `CI` is set |
| `EXPLICIT_WAIT_MS` | `30000` |
| `VIDEO` | `on` (record pass and fail). Use `retain-on-failure` to save disk space |

## Run tests

```bash
npm test                 # all tests
npm run test:smoke       # @smoke
npm run test:regression  # @regression
```

## Test videos

With `VIDEO=on` (default), Playwright records **every** test and keeps the file whether the test passes or fails.

1. Run tests: `npm test`
2. **HTML report (easiest):** `npx playwright show-report` — open a test and use the **Video** attachment.
3. **On disk:** each run writes `test-results/<test-folder>/video.webm` (paths vary by test title).

To record only when a test fails (smaller `test-results` folder):

```bash
# PowerShell
$env:VIDEO="retain-on-failure"; npm test
```

CI already uploads `test-results/` as a workflow artifact so videos are available from GitHub Actions when `VIDEO=on`.

## Hooks and reporting (Playwright vs TestNG listeners)

| Concern | Where |
| --- | --- |
| Browser / context per test | Built-in Playwright `page` fixture |
| Framework page objects | `src/fixtures/testFixtures.ts` (`loginPage`, `shopPage`) |
| Failure screenshots, video & trace | `playwright.config.ts` (`screenshot`, `video`, `trace`, `retries`) |
| HTML report | `reporter: html` in config |
| Pass/fail logging (like `TestListener`) | `src/reporters/testLogReporter.ts` → `logs/automation.log` |
| Suite-level setup (embedded app) | `globalSetup` — not used (external MediShop URL) |

Import tests from `src/fixtures/testFixtures.ts`, not `@playwright/test` directly, so every spec uses the same fixtures.

## Rules

1. Assertions live in `tests/`, not in `src/pages/`.
2. Locators live in page classes and components.
3. URLs and timeouts come from `src/config/`, not hard-coded in tests.
