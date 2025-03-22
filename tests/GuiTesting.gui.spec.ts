import { test, expect } from '@playwright/test';
import { GooglePage } from '../pages/googlePage';
import { MoroSystemsPage } from '../pages/moroSystemsPage';

test('GUI Testing', { tag: ['@chromium'] }, async ({ page }) => {
  await page.goto('https://google.com/?hl=cs'); // /?hl=cs will ensure Google in Czech
  const googlePage = new GooglePage(page);
  await googlePage.acceptCookies();
  await googlePage.search('MoroSystems');

  const link = page.locator('(//span[text()="https://www.morosystems.cz"])[1]');
  await expect(link).toBeVisible({ timeout: 7000 });
  await expect(page).toHaveURL(/\/search/);
  const title = await page.title();
  expect(title).toContain('MoroSystems');
  await googlePage.validateSearchResultsPage();

  await googlePage.openResult(
    'MoroSystems - užitečná IT řešení a technologické inovace'
  );
  const moroSystemsPage = new MoroSystemsPage(page);
  await moroSystemsPage.acceptCookies();
  await moroSystemsPage.openKariera();
  await moroSystemsPage.filterCity('Brno');
  await moroSystemsPage.checkFilterCity('Brno');
});

test(
  'Visual Testing',
  {
    tag: ['@chromium', '@firefox', '@safari', '@mobileChrome', '@mobileSafari'],
  },
  async ({ page }) => {
    await page.goto('https://www.morosystems.cz/kariera/', {
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => {
      document.body.style.overflow = 'hidden'; // hide scrollbar in headed mode
    });
    const moroSystemsPage = new MoroSystemsPage(page);
    await expect(page).toHaveScreenshot({
      fullPage: true,
      mask: [moroSystemsPage.bgVideo, moroSystemsPage.positions],
      maxDiffPixels: 20000,
      timeout: 20000,
    });
  }
);
