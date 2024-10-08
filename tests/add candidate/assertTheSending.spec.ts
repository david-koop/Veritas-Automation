import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage, { generateRandomNumbers } from '../../pages/organization side/addCandidate.page';


let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'
const positionName = 'AutomationsDavid1'
let id = generateRandomNumbers() + ' AUTO'
const email = 'amtest@ravtech.co.il';
let phoneNumber = '0546255777';


test.beforeAll(async ({ browser }) => {

  browser = await chromium.launch({ slowMo: 40 });
  context = await browser.newContext();
  page = await context.newPage();
});
test.afterAll(async () => {
  // await context.close();
});



test('send SMS and verify the SMS received', async () => {
  const addCandidatePage = new AddCandidatePage(page)

  // go to the sms page and get the phone number
  await page.goto('https://quackr.io/temporary-numbers/israel', { waitUntil: 'domcontentloaded' });
  await page.locator('[class="text-blue-500 hover:text-blue-700"]').first().click()
  await page.locator('[class="text-lg font-semibold text-blue-600 p-2 text-center"]').first().click()
  const url = page.url()
  phoneNumber = await page.locator('[class="text-lg font-semibold text-blue-600 p-2 text-center"]').textContent()

  console.log(phoneNumber)


  // Manage tabs
  const originalPage = page; // Save reference to the original page
  const addCandidateTab = await context.newPage(); // Create a new tab

  // Perform actions in the new tab
  const addCandidatePageNewTab = new AddCandidatePage(addCandidateTab);





  await addCandidatePageNewTab.goto(organizationName)
  //Adding ID and verification that it is unique
  let idAvailable = false

  while (!idAvailable) {
    idAvailable = await addCandidatePageNewTab.fillAndCheckId(id)

    if (!idAvailable) {
      id = generateRandomNumbers() + ' AUTO'
    }
  }

  await addCandidatePageNewTab.addPosition(positionName)
  await addCandidatePageNewTab.fillCandidateInfo('david', 'automation', 'male')
  await addCandidatePageNewTab.fillPhoneNumberAndEmail(phoneNumber, email)

  // send function
  await addCandidatePageNewTab.sendLink('SMS')



  /* ------------------------------------------- Assert --------------------------------------------------------*/
  await expect(addCandidatePageNewTab.$.successMessage).toBeVisible({ timeout: 30000 })


  await originalPage.bringToFront();
  await page.waitForTimeout(10000)

})


test.describe('Assert the sending link', () => {

  test('send Email and verify the email received', async () => {

    // go to the outlook Email page and do login 
    await page.goto('https://outlook.office.com/', { waitUntil: 'domcontentloaded' });



    if (await page.url().includes('login.microsoftonline.com/')) {

      if (await page.locator('.table-cell.text-left.content').getByText('amtest@ravtech.co.il').isVisible()) {
        await page.locator('.table-cell.text-left.content').getByText('amtest@ravtech.co.il').click()
      } else {
        await page.locator('[type="email"]').fill('amtest@ravtech.co.il')
        await page.locator('[type="submit"]').click()
      }

      await page.waitForTimeout(1000)
      await page.locator('[type="password"]').fill('Q#479983186027ob')
      await page.locator('[type="submit"]').click()
      await page.waitForTimeout(1000)
      if (await page.locator('#idBtn_Back').isVisible()) {
        await page.locator('#idBtn_Back').click()
      }


    }


    // Manage tabs
    const originalPage = page; // Save reference to the original page
    const addCandidateTab = await context.newPage(); // Create a new tab

    // Perform actions in the new tab
    const addCandidatePageNewTab = new AddCandidatePage(addCandidateTab);




    await addCandidatePageNewTab.goto(organizationName)
    //Adding ID and verification that it is unique
    let idAvailable = false

    while (!idAvailable) {
      idAvailable = await addCandidatePageNewTab.fillAndCheckId(id)

      if (!idAvailable) {
        id = generateRandomNumbers() + ' AUTO'
      }
    }

    await addCandidatePageNewTab.addPosition(positionName)
    await addCandidatePageNewTab.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePageNewTab.fillPhoneNumberAndEmail(phoneNumber, email)

    // send function
    await addCandidatePageNewTab.sendLink('Email')




    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePageNewTab.$.successMessage).toBeVisible({ timeout: 30000 })


    await originalPage.bringToFront();


    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(page.locator('.TtcXM').first()).toContainText('Link to the test', { ignoreCase: true })



    await page.locator('.TtcXM').first().click()
    const mewTabPromise = page.waitForEvent('popup');
    await page.locator('[target="_blank"]').getByText('Press here to start').click()
    const newTab = await mewTabPromise;




    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(newTab.getByPlaceholder('ID')).toHaveValue(id, { timeout: 30000 });


    await newTab.locator('.btn-block.accessibility-outline-focus').click()

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await newTab.waitForURL('**\/nplayer/passing');
    await expect(newTab.url()).toContain('nplayer/passing')


    await newTab.close()
    await page.locator('.QpoLy').first().hover()
    await page.locator('.Z0dEQ.IKEiQ').first().click()

    await page.waitForTimeout(2000)
  })



});

