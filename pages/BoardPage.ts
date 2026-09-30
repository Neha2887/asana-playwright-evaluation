import { expect, type Page } from '@playwright/test';

export class BoardPage {
  constructor(private readonly page: Page) {}

  async openProject(project: string): Promise<void> {
    // Sidebar buttons also contain a description; find the button by its exact heading.
    const projectButton = this.page.getByRole('navigation').getByRole('button').filter({
      has: this.page.getByRole('heading', { name: project, exact: true }),
    });
    await expect(projectButton).toHaveCount(1);
    await projectButton.click();
    await expect(this.page.locator('header').getByRole('heading', { name: project, exact: true })).toBeVisible();
  }

  async verifyTask(column: string, title: string, tags: readonly string[]): Promise<void> {
    // Column headings include a task count, for example "To Do (2)".
    const escapedColumn = column.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const heading = this.page.getByRole('main').getByRole('heading', {
      level: 2, name: new RegExp(`^${escapedColumn}\\s*\\(\\d+\\)$`),
    });
    await expect(heading).toHaveCount(1);
    // The app has no semantic card/column roles or test IDs. These immediate
    // parent relationships are isolated here rather than spread through tests.
    const columnContainer = heading.locator('..');
    const taskHeading = columnContainer.getByRole('heading', { level: 3, name: title, exact: true });
    await expect(taskHeading).toHaveCount(1);
    await expect(taskHeading).toBeVisible();
    const card = taskHeading.locator('..');
    for (const tag of tags) {
      await expect(card.getByText(tag, { exact: true })).toBeVisible();
    }
    // All tag badges use rounded-full; verify the exact set, rejecting extra tags.
    const badges = card.locator('span.rounded-full');
    await expect(badges).toHaveCount(tags.length);
    await expect.poll(async () => (await badges.allTextContents()).map(t => t.trim()).sort())
      .toEqual([...tags].sort());
  }
}
