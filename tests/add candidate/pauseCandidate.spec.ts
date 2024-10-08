import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage from '../../pages/organization side/addCandidate.page';
import OrganizationSelectPage from '../../pages/organization side/organizationSelect';
import { generateRandomNumbers } from '../../pages/organization side/addCandidate.page';
import OrgNavbarPage from '../../pages/organization side/OrgNavbar.page';
import AllCandidatePage from '../../pages/organization side/allCandidates.page';


let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'
const positionName = 'AutomationsDavid1'
let id = generateRandomNumbers() + ' AUTO'



test.describe.serial('Pause candidate', () => {
  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    // await context.close();
  });



  test('Mark the first pause option', async () => {
    const addCandidatePage = new AddCandidatePage(page)
    const orgNavbarPage = new OrgNavbarPage(page)
    const allCandidatesPage = new AllCandidatePage(page)

     await addCandidatePage.goto(organizationName)

    //Adding ID and verification that it is unique
    let idAvailable = false

    while (!idAvailable) {
      idAvailable = await addCandidatePage.fillAndCheckId(id)

      if (!idAvailable) {
        id = generateRandomNumbers() + ' AUTO'
      }
    }

    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePage.markTheFirstCheckboxPauseOption()
    await addCandidatePage.save()
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
    await orgNavbarPage.navigateToAllCandidates()
    await allCandidatesPage.goToFutureCandidates()
    await allCandidatesPage.searchCandidate(id)


  /* ------------------------------------------- Assert --------------------------------------------------------*/
  await expect(allCandidatesPage.$.exclamationIcon.first()).toBeVisible({timeout:10000})

  })

});

