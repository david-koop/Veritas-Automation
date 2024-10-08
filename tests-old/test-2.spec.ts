import { test, expect, Page } from '@playwright/test';
import AssessmentEditorTabsPage from '../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page';
import { checkForLogin } from '../global/utils/check-for-login';
import AssessmentPreview from '../pages/configurator/assessments/assessment editor/preview/assessmentPreview.page';

let page: Page;
test.beforeAll('test', async ({ browser }) => {
  const context = await browser.newContext({});
  page = await context.newPage();
  const assessTab = new AssessmentEditorTabsPage(page);
  


});
  test('',async()=>{
await page.goto('https://ama.am-test.com/nplayer/login');
await page.getByPlaceholder('User name').click();
await page.getByPlaceholder('User name').fill('adam@ravtech.co.il');
await page.getByPlaceholder('Password').click();
await page.getByPlaceholder('Password').fill('Dk123456@');
await page.getByRole('button', { name: 'Log In' }).click();
await page.getByPlaceholder('ID').click();
await page.getByPlaceholder('ID').fill('33322');
const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Start' }).click();
  const page1 = await page1Promise;
await page1.goto('https://assessment.speaknow.co/#/?company=AM%20Dev&project=AdamMilo&attemptId=0cd7ec0e-250c-4596-a7c6-a0a3435d51ab');
await page1.goto('https://assessment.speaknow.co/#/welcome');
await page1.getByLabel('I agree with Terms &').check();




// await page.goto('https://ama.am-test.com/nplayer/login');




  })

