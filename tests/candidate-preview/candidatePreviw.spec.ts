import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage from '../../pages/organization side/addCandidate.page';
import OrganizationSelectPage from '../../pages/organization side/organizationSelect';
import { generateRandomNumbers } from '../../pages/organization side/addCandidate.page';
import OrgNavbarPage from '../../pages/organization side/OrgNavbar.page';
import AllCandidatePage from '../../pages/organization side/allCandidates.page';
import PlayerInTest from '../../pages/player/playerInTest';


let page: Page;
let context;
let id = generateRandomNumbers() + ' AUTO'
const organizationName = '00 QA AUTOMATION'
const positionName = 'AutomationsDavid1'



test.describe.serial('Add candidate', () => {
  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    // await context.close();
  });

// FINISH THIS!!!!!!

  test('add new candidate', async () => {
    const addCandidatePage = new AddCandidatePage(page)
    const orgNavbarPage = new OrgNavbarPage(page)
    const allCandidatesPage = new AllCandidatePage(page)

    await addCandidatePage.goto(organizationName)
    
    await addCandidatePage.generateAndFillID(id)
    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    
    // await page.pause()
    const nextPagePromise = page.waitForEvent('popup')
    await addCandidatePage.saveAndStart()
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    // await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
    const newPlayerPage = await nextPagePromise
    
    const runPlayer = new PlayerInTest(newPlayerPage,undefined)

    await runPlayer.aaa()
    await page.waitForTimeout(6000)
    await runPlayer.aaa()
    await page.waitForTimeout(6000)

  });
});