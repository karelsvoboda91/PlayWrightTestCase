import { Page, Locator, expect } from '@playwright/test';

export class GooglePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly searchInput: Locator;
  readonly allTab: Locator;
  readonly picturesTab: Locator;
  readonly newsTab: Locator;

  // In this page object I want to show you Playwright built-in locators
  // It would be ideal to use some Id in locators, but I'm afraid that Google changes most attributes dynamically
  // For this demo purpose I use only Czech localization
  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByRole('button', {
      name: 'Přijmout vše',
    });
    this.searchInput = page.getByLabel('Najít');
    this.allTab = page.getByText('Vše').first();
    this.picturesTab = page.getByText('Obrázky').first();
    this.newsTab = page.getByText('Zprávy').first();
  }

  async acceptCookies() {
    const isVisible = await this.acceptCookiesButton
      .waitFor({ state: 'visible', timeout: 5000 })
      .then(() => this.acceptCookiesButton.isVisible())
      .catch(() => false);

    if (isVisible) {
      await this.acceptCookiesButton.click();
    }
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openResult(text: string) {
    await this.page.getByText(text).click();
  }

  async validateSearchResultsPage() {
    await expect(this.allTab).toBeVisible({ timeout: 5000 });
    await expect(this.picturesTab).toBeVisible();
    await expect(this.newsTab).toBeVisible();
  }
}
