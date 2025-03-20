import { test, expect } from '@playwright/test';
import { GooglePage } from '../pages/googlePage';
import { MoroSystemsPage } from '../pages/moroSystemsPage';

test('GUI Testing', async ({ page }) => {
    await page.pause();

    const googlePage = new GooglePage(page);
    await page.goto('https://google.com/?hl=cs'); // /?hl=cs will ensure Google in Czech
    await googlePage.acceptCookies();
    await googlePage.search('MoroSystems');
    // overit stránku
    await expect(page.locator(':has-text("Vše")')).toBeVisible();
    await expect(page.locator(':has-text("Obrázky")')).toBeVisible();




    await googlePage.openResult('MoroSystems - užitečná IT řešení a technologické inovace')

    const moroSystemsPage = new MoroSystemsPage(page);
    await moroSystemsPage.acceptCookies();
    await moroSystemsPage.openKariera();
    await moroSystemsPage.filterCity('Brno');
});