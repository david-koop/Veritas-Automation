import { test, expect, Page, chromium, } from '@playwright/test'
import AllCandidatePage from '../../pages/organization side/allCandidates.page';


let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'
const positionName = 'AutomationsDavid1'



test.describe('Send links', () => {
  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    // await context.close();
  });



  test('Send SMS for one candidate', async () => {
    const allCandidatesPage = new AllCandidatePage(page)

     await allCandidatesPage.goto(organizationName)

    

    await allCandidatesPage.goToFutureCandidates()
  
    await allCandidatesPage.openSendLinkForTheFirstCandidate()
    await allCandidatesPage.selectSendingLinkMethod('SMS')
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(allCandidatesPage.$.sendLinkMessage).toBeVisible({ timeout: 10000 })
    
  })



  test('Send Email for one candidate', async () => {
    const allCandidatesPage = new AllCandidatePage(page)

     await allCandidatesPage.goto(organizationName)

    

    await allCandidatesPage.goToFutureCandidates()
  
    await allCandidatesPage.openSendLinkForTheFirstCandidate()
    await allCandidatesPage.selectSendingLinkMethod('Email')
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(allCandidatesPage.$.sendLinkMessage).toBeVisible({ timeout: 10000 })
    
  })



  test('Send SMS for all marked candidates', async () => {
    const allCandidatesPage = new AllCandidatePage(page)

     await allCandidatesPage.goto(organizationName)

    

    await allCandidatesPage.goToFutureCandidates()
  
    await allCandidatesPage.markAllCandidate()
    await allCandidatesPage.openSendLinkForAllMarkedCandidates()
    await allCandidatesPage.selectSendingLinkMethod('SMS')
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(allCandidatesPage.$.sendLinkMessage).toBeVisible({ timeout: 10000 })
    
  })



  test('Send Email for all marked candidates', async () => {
    const allCandidatesPage = new AllCandidatePage(page)

     await allCandidatesPage.goto(organizationName)

    

    await allCandidatesPage.goToFutureCandidates()
  
    await allCandidatesPage.markAllCandidate()
    await allCandidatesPage.openSendLinkForAllMarkedCandidates()
    await allCandidatesPage.selectSendingLinkMethod('Email')
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(allCandidatesPage.$.sendLinkMessage).toBeVisible({ timeout: 10000 })
    
  })

});

