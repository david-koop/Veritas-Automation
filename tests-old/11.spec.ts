import { test, expect, selectors } from '@playwright/test'
import positionsPage from '../pages/organization configurator side/positions/positions.page'
import browser from '../Player-Runner/BrowserManager'



test('1234', async ({ page }) => {
    const positions = new positionsPage(page)
    await positions.goto('00 QA AUTOMATION')
    await positions.search('Automation Speak')
    await console.log('finish search')
    await positions.checkPositionStatusAndConnect()
    await page.waitForTimeout(1000)
    console.log('finish test successfully')


})
test('1222', async ({ page }) => {
    await page.goto("https://34.165.52.158")

    // await page.pause()
    const captcha = await page.frameLocator('iframe')
    const contentFrame = await captcha.getByRole('alert',{name:'Success!'})
    await contentFrame.waitFor({state:'visible'})
    console.log(captcha) 
    console.log(contentFrame) 
    const successText = await contentFrame.textContent()
    console.log(successText)

    await page.locator("[name='username']").click()
    await page.locator("[name='username']").fill('davidkoop@ravtech.co.il');
    await page.locator("[name='password']").click()
    await page.locator("[name='password']").fill('123456@');
    // const captchachildFrames = await captcha.childFrames()
    // await captchachildFrames[0].locator('[id="success-text"]').highlight()


    await page.waitForTimeout(5000)

})