import { Page, Locator, expect } from '@playwright/test';

export class GooglePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly searchInput: Locator;
  readonly allTab: Locator;
  readonly picturesTab: Locator;
  readonly newsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('(//button)[5]');
    this.searchInput = page.locator('//form[@action="/search"]//textarea');
    this.allTab = page.locator('//div[@role="list"]//div[text()="Vše"]');
    this.picturesTab = page.locator(
      '//div[@role="list"]//div[text()="Obrázky"]'
    );
    this.newsTab = page.locator('//div[@role="list"]//div[text()="Zprávy"]');
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
    await this.page.click(`//h3[text()="${text}"]`);
  }

  async validateSearchResultsPage() {
    await expect(this.allTab).toBeVisible({ timeout: 5000 });
    await expect(this.picturesTab).toBeVisible();
    await expect(this.newsTab).toBeVisible();
  }
}
