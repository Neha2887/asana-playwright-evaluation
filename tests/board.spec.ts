import { test } from '@playwright/test';
import data from '../data/scenarios.json';
import { LoginPage } from '../pages/LoginPage';
import { BoardPage } from '../pages/BoardPage';

type Scenario = { id: string; project: string; column: string; task: string; tags: string[] };
const scenarios: Scenario[] = data.scenarios;

test.describe('Data-driven project board verification', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).login(
      process.env.DEMO_USERNAME ?? data.login.username,
      process.env.DEMO_PASSWORD ?? data.login.password,
    );
  });

  for (const scenario of scenarios) {
    test(`${scenario.id}: ${scenario.project} | ${scenario.task} | ${scenario.column}`, async ({ page }) => {
      const board = new BoardPage(page);
      await test.step(`Open ${scenario.project}`, () => board.openProject(scenario.project));
      await test.step(`Verify column and exact tags: ${scenario.tags.join(', ')}`, () =>
        board.verifyTask(scenario.column, scenario.task, scenario.tags));
    });
  }
});
