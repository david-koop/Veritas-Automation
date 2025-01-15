import { test, expect, Page, chromium, BrowserContext, } from '@playwright/test'
import PositionsTab from '../../pages/configurator/settings/positions/positionsTab.page';

let date = new Date().toISOString().split('T')[0]

let page: Page;
let context: BrowserContext;
let positions: PositionsTab;
let name = 'David Automation ' + date;

test.describe.serial('Position', () => {

    test.beforeAll(async ({ browser }) => {
        browser = await chromium.launch({ slowMo: 40 });
        context = await browser.newContext();
        page = await context.newPage();
    });


    test.afterAll(async () => {
        await page.close();
    });


    test('create position', async () => {
        positions = new PositionsTab(page)

        await positions.goto()

        const result = await positions.addPosition(name)
        console.log(result);
        
    /* ----------------------------------------- Assert ---------------------------------------------------*/
        expect(result).toBeTruthy()
        

    })




});