import { Page, Locator } from '@playwright/test';

export class GooglePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('(//button)[5]');
    this.searchInput = page.locator('//form[@action="/search"]//textarea');
  }

  async acceptCookies() {
    const isVisible = await this.acceptCookiesButton
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(() => this.acceptCookiesButton.isVisible())
    .catch(() => false);

    if(isVisible){
      await this.acceptCookiesButton.click();
    }
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.page.keyboard.press('Enter');
  }

  async openResult(text: string) {
    await this.page.click(`//h3[text()="${text}"]`);
  }

//div[@id='topstuff']

//div[@id='search']
//div[@id='botstuff']
//form[@action='/search']//textarea
//div[@role="list"]//div[text()="Vše"]
//div[@role="list"]//div[text()="Obrázky"]
//div[@role="list"]//div[text()="Zprávy"]
}