import { test, expect, Page, chromium, } from '@playwright/test'


test('sdfsdf', async ({ page }) => {
   await page.goto('https://www.google.com')
   await page.pause()

})