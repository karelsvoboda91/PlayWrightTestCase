import { Page, Locator } from '@playwright/test';

export class MoroSystemsPage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly onasDropDown: Locator;
  readonly karieraButton: Locator;
  readonly cityFilterDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('//div[@id="cookiescript_injected_wrapper"]//div[@id="cookiescript_accept"]');
    this.onasDropDown = page.locator('//div[@class="dropdown__toggle"]//a[text()="O nás"]');
    this.karieraButton = page.locator('//ul[@class="dropdown__list"]//a[text()="Kariéra"]');
    this.cityFilterDropDown = page.locator('//div[@id="pozice"]//span[@class="inp-custom-select__select-wrap"]');
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  async openKariera(){
    await this.onasDropDown.click();
    await this.karieraButton.click();
  }

  async filterCity(city: string){
    await this.cityFilterDropDown.click();
    await this.page.click(`//div[@class="inp-custom-select__wrapper"]//label[@data-filter="${city}"]`);
  }
}