import { Page, Locator, expect } from '@playwright/test';

export class MoroSystemsPage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly onasDropDown: Locator;
  readonly karieraButton: Locator;
  readonly cityFilterDropDown: Locator;
  readonly positions: Locator;
  readonly bgVideo: Locator;
  readonly position: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('//div[@id="cookiescript_injected_wrapper"]//div[@id="cookiescript_accept"]');
    this.onasDropDown = page.locator('//div[@class="dropdown__toggle"]//a[text()="O nás"]');
    this.karieraButton = page.locator('//ul[@class="dropdown__list"]//a[text()="Kariéra"]');
    this.cityFilterDropDown = page.locator('//div[@id="pozice"]//span[@class="inp-custom-select__select-wrap"]');
    this.positions = page.locator('//ul[@class="c-positions__wrap"]');
    this.bgVideo = page.locator('//div[@class="b-intro__bg"]');
    this.position = page.locator('//div[@id="pozice"]//li');
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

  async openKariera(){
    await this.onasDropDown.click();
    await this.karieraButton.click();
  }

  async filterCity(city: string){
    await this.cityFilterDropDown.click();
    await this.page.click(`//div[@class="inp-custom-select__wrapper"]//label[@data-filter="${city}"]`);
  }

  async checkFilterCity(city: string){
    const allElements = await this.position.all();    
    for (const element of allElements) {
      await expect(element).toContainText(city);
    }
  }
}