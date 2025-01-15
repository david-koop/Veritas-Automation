import { test, expect, Page, chromium, } from '@playwright/test'
import AssessmentsPage from '../../pages/configurator/assessments/assessment.page';
import AssessmentCreationPage from '../../pages/configurator/assessments/assessment creation/assessmentCreation.page';
import AssessmentEditorTabsPage from '../../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page';
import AssessmentEditorScalesTab, { personalityScales } from '../../pages/configurator/assessments/assessment editor/scales tab/scaleTab.page';
import QuestionEditorPage from '../../pages/configurator/assessments/assessment editor/question tab/questionsEditor/questionEditor.page';
import AssessmentEditorQuestionTab from '../../pages/configurator/assessments/assessment editor/question tab/questionTab.page';

let page: Page;
let context;

test.describe.serial('Personality', () => {
  test.beforeAll(async ({ browser }) => {
    console.log('opened youtube')
    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
  });


  test.afterAll(async () => {
    // await context.close();
  });


  test('Create personality assessment with the settings: Automatic Continue, Unlimited corrections, Skipping', async () => {
    const assessmentPage = new AssessmentsPage(page);
    const assessmentCreationPage = new AssessmentCreationPage(page);

    // this 'goto' do login and go to the assessment page
    await assessmentPage.goto();

    await assessmentCreationPage.createNewAssessment('Personality');

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(assessmentCreationPage.$.successMessage).toBeVisible({ timeout: 3000 })

  });

  test('Add scales for the new personality assessment', async () => {
    const scalesPage = new AssessmentEditorScalesTab(page)

    await scalesPage.navigateToScaleTabAndAddScalesAndNormToAssessment('Personality')

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(scalesPage.$.successMessage).toBeVisible()


  });

  test('Add questions and answers and connect the answers to scales', async () => {
    const assessmentTabsPage = new AssessmentEditorTabsPage(page);
    const questionTabPage = new AssessmentEditorQuestionTab(page);
    const questionPage = new QuestionEditorPage(page);


    await assessmentTabsPage.navigateToQuestions();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Confirm info', [], personalityScales, 12, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Date', [], personalityScales, 6, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Dates range', [], personalityScales, 1, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Drag and Drop', ['answer 1', 'answer 2', 'answer 3'], personalityScales, 2, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Free text', [], personalityScales, 3, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Multiple choice', ['answer 1', 'answer 2', 'answer 3'], personalityScales, 1, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('No answers', [], personalityScales, 2, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();
    await questionPage.$.successMessage.waitFor({ state: 'hidden' })


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Questionnaire', [], personalityScales, 3, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer 1', 'answer 2', 'answer 3'], personalityScales, 1, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Video answer', ['answer 1', 'answer 2', 'answer 3'], personalityScales, 2, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Yes-No', [], personalityScales, 3, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();

  });

  test('Add question with media', async () => {
    const questionTabPage = new AssessmentEditorQuestionTab(page);
    const questionPage = new QuestionEditorPage(page);

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.addMediaToQuestion();

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.addMediaSuccessfullyMessage).toBeVisible();

    /* ----------------------------------------- Question type ---------------------------------------------------*/
    await questionPage.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer 1',], personalityScales, 1, undefined);

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(questionPage.$.successMessage).toBeVisible();


  });

  test('Check the preview', async () => {
    const assessmentTabPage = new AssessmentEditorTabsPage(page);
    const questionPage = new QuestionEditorPage(page);

    await questionPage.gotoQuestionMainPage();
    const previewPage = await assessmentTabPage.openPreview();

    await previewPage.clickLanguagesOkButton();
    await previewPage.clickOnTheFirstAnswer();

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(previewPage.$.editQuestionNumber).toContainText('2')
    await previewPage.page.close()

  });

  test('Duplicate the assessment', async () => {
    const assessmentTabPage = new AssessmentEditorTabsPage(page);
    const questionPage = new QuestionEditorPage(page);

    await assessmentTabPage.duplicateAssessment();

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(assessmentTabPage.$.duplicateAssessmentPopupButton).toBeEnabled({ timeout: 15000 })

  });



});

