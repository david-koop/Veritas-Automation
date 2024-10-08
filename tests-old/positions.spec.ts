import { test, expect, Page } from '@playwright/test'
import PositionsTab from '../pages/configurator/settings/positions/positionsTab.page'
import PositionListSection from '../pages/configurator/settings/positions/list/positionList.page'
import { after } from 'node:test'


test.describe('POSITIONS TESTS', () => {
    let positions: PositionsTab
    let name = 'meby position ' + Date.now()

    test.beforeEach(async ({ page }) => {
        positions = new PositionsTab(page)
        await positions.goto()
    })


    test('create position', async () => {
        const result = await positions.addPosition(name)
        console.log(result);
        expect(result).toBeTruthy()
    })

    // test(`-delete all meby's position`, async ({ page }) => {
        // const list = new PositionListSection(page)
        // await list.deleteAllMebyPosition()

    // })

    // test('edit assessment', async () => {
    //     // TODO
    //     // const assessmentEditor = await 
    // })

    // test.afterEach(async () => {
    // await positions.deletePosition(name)
    // await page.waitForTimeout(30000)
    // await page.close()
    // })
})