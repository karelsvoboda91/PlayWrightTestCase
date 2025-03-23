Installation
-----------------
- Checkout this repository
- `npm install`
- `npx playwright install`

Install and start backend app
-----------------
- Info: [todo-be](todo-be/README.md)

Run tests
-----------------
- Run all tests: `npx playwright test`
- Run API tests: `npx playwright test ./tests/ApiTesting.api.spec.ts`
- Run GUI tests: `npx playwright test ./tests/GuiTesting.gui.spec.ts`

Show report
-----------------
- Show html report: `npx playwright show-report`
- GitHub Actions report is located in Artifacts section

Prettier code style
-----------------
- Auto code style fix: `npx prettier --write "**/*.ts"`
