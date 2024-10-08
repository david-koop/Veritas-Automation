import { expect, test } from '@playwright/test'
import LoginPage from '../pages/login/login.page';
import URLs from '../URLs';

test.describe('LOGIN TESTS', () => {

    test('login and go to the new page', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto()
        await login.login()
        await page.waitForURL(URLs.configurator.dashboard)
        expect(page.url()).toContain(URLs.configurator.dashboard)
    })

    test('error message', async ({ page }) => {
        const login = new LoginPage(page)
        await login.goto()
        await login.login('aa', '324')

        expect(await login.$.errorMessageDiv.innerText()).toContain('Access denied')
    })

})