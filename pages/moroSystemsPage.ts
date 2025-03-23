import { Page, Locator, expect } from '@playwright/test';

export class MoroSystemsPage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly aboutUsDropDown: Locator;
  readonly careerButton: Locator;
  readonly cityFilterDropDown: Locator;
  readonly positionsWrap: Locator;
  readonly position: Locator;
  readonly bgVideo: Locator;

  // In this page object I want to show you XPath locators
  // I personally prefer XPath locators because they are more strict.
  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator(
      '//div[@id="cookiescript_injected_wrapper"]//div[@id="cookiescript_accept"]'
    );
    this.aboutUsDropDown = page.locator(
      '//div[@class="dropdown__toggle"]//a[@href="https://www.morosystems.cz/o-nas/"]'
    );
    this.careerButton = page.locator(
      '//ul[@class="dropdown__list"]//a[@href="https://www.morosystems.cz/kariera/"]'
    );
    this.cityFilterDropDown = page.locator(
      '//div[@id="pozice"]//div[@class="inp-custom-select"]'
    );
    this.positionsWrap = page.locator('//ul[@class="c-positions__wrap"]');
    this.position = page.locator('//div[@id="pozice"]//li');
    this.bgVideo = page.locator('//div[@class="b-intro__bg"]');
  }

  async acceptCookies() {
    const isVisible = await this.acceptCookiesButton
      .waitFor({ state: 'visible', timeout: 10000 })
      .then(() => this.acceptCookiesButton.isVisible())
      .catch(() => false);

    if (isVisible) {
      await this.acceptCookiesButton.click();
    }
  }

  async openCareerPage() {
    await this.aboutUsDropDown.click();
    await this.careerButton.click();
  }

  async filterCity(city: string) {
    await this.cityFilterDropDown.scrollIntoViewIfNeeded();
    await this.cityFilterDropDown.click();
    await this.page.locator(`//label[@data-filter="${city}"]`).click();
  }

  async checkFilterCity(city: string) {
    const allElements = await this.position.all();
    for (const element of allElements) {
      await expect(element).toContainText(city);
    }
  }
}
