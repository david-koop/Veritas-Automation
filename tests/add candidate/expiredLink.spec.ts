import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage, { generateRandomNumbers, getTomorrow, getYesterday } from '../../pages/organization side/addCandidate.page';
import OrganizationSelectPage from '../../pages/organization side/organizationSelect';
import OrgNavbarPage from '../../pages/organization side/OrgNavbar.page';
import AllCandidatePage from '../../pages/organization side/allCandidates.page';


let page: Page;
let context;
let id = generateRandomNumbers() + ' AUTO'
const organizationName = '00 QA AUTOMATION'
const positionName = 'AutomationsDavid1'
const pastTestDate = getYesterday()
const futureTestDate = getTomorrow()





test.describe.serial('Expired Link', () => {
  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    // await context.close();
  });



  test('Add candidate with expired link', async () => {
    const addCandidatePage = new AddCandidatePage(page)
    const orgNavbarPage = new OrgNavbarPage(page)
    const allCandidatesPage = new AllCandidatePage(page)

    await addCandidatePage.goto(organizationName)
    
    await addCandidatePage.generateAndFillID(id)
    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePage.changeTheTestDate(pastTestDate)
    await addCandidatePage.saveAndStart()
    
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
    




    // The organization setting should be with link expiry for one day
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.NoTestsError).toContainText('No tests available',{ignoreCase:true,timeout:2000})

  })

  

  test('Add candidate with future link', async () => {
    const addCandidatePage = new AddCandidatePage(page)
    const orgNavbarPage = new OrgNavbarPage(page)
    const allCandidatesPage = new AllCandidatePage(page)

    await addCandidatePage.goto(organizationName)

    await addCandidatePage.generateAndFillID(id)
    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePage.changeTheTestDate(futureTestDate)
    await addCandidatePage.saveAndStart()

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
    



    // The organization setting should be with link expiry for one day
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.NoTestsError).toContainText('No tests available',{ignoreCase:true,timeout:2000})

  })


});

