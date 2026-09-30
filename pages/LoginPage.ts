import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Project Board Login', exact: true })).toBeVisible();
    await this.page.getByLabel('Username', { exact: true }).fill(username);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(this.page.getByRole('button', { name: 'Logout', exact: true })).toBeVisible();
    await expect(this.page.getByRole('navigation')).toBeVisible();
  }
}
