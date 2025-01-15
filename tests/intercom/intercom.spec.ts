import { test, expect, Page, chromium, } from '@playwright/test'
import ConfiguratorNavbarPage from '../../pages/configurator/configuratorNavbar.page';

let page: Page;
let context;


test.describe.serial('Intercom', () => {
    test.beforeAll(async ({ browser }) => {

        browser = await chromium.launch({ slowMo: 40 });
        context = await browser.newContext();
        page = await context.newPage();
    });
    test.afterAll(async () => {
        // await context.close();
    });

    test('check the intercom', async () => {
        const dashboardPage = new ConfiguratorNavbarPage(page)

        await dashboardPage.goto();
        await page.getByLabel('Open Intercom Messenger').click()
        await page.locator('iframe[name="intercom-messenger-frame"]').contentFrame().getByTestId('send-a-message-button').click()

        /* ------------------------------------------- Assert --------------------------------------------------------*/
        await expect(page.locator('iframe[name="intercom-messenger-frame"]').contentFrame().getByPlaceholder('Message…')).toBeVisible()
    })
});