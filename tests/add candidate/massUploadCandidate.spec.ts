import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage from '../../pages/organization side/addCandidate.page';


let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'


test.describe.serial('Mass upload', () => {
  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    // await context.close();
  });



  test('add file', async () => {
    const addCandidatePage = new AddCandidatePage(page)
    
     await addCandidatePage.goto(organizationName)
     await addCandidatePage.massUpload()

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMassImport).toBeVisible({ timeout: 30000 })
   

  })


});

