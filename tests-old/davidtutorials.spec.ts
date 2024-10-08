import { test, expect } from '@playwright/test';

import { GeneratedIdentifierFlags, forEachChild } from "typescript";

import waitForLoading from "../global/utils/waitForLoading";
import AssessmentsPage from "../pages/configurator/assessments/assessment.page";
import AssessmentEditorTabsPage from "../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page";
import AssessmentListSection from "../pages/configurator/assessments/assessment list/assessmentList.page";
import AssessmentEditorQuestionTab from "../pages/configurator/assessments/assessment editor/question tab/questionTab.page";
import QuestionEditorPage from "../pages/configurator/assessments/assessment editor/question tab/questionsEditor/questionEditor.page";
import AddScaleToAnswersSection from "../pages/configurator/assessments/assessment editor/question tab/questionsEditor/add scale to answers section/addScaleToAnswers.page";
import WrapperCreateNewAssessment from '../pages/configurator/assessments/assessment creation/exampleWrapperCreateNewAssessment.page';
import AssessmentCreationPage from '../pages/configurator/assessments/assessment creation/assessmentCreation.page';
import { integrityExtendedScales, personalityScales, integritySEScales, skillsIGameScales, skillsScales, skillsSpeakScales } from '../pages/configurator/assessments/assessment editor/scales tab/scaleTab.page'
import singleChoice from '../pages/player/screens/singleChoice';

test('david', async ({ page }) => {
    const createAssessment = new AssessmentCreationPage(page);
    // const scalesPage = new AssessmentEditorScalesTab(page);
    const assessmentEditorTabs = new AssessmentEditorTabsPage(page);
    const assessmentList = new AssessmentListSection(page);
    const questionPage = new AssessmentEditorQuestionTab(page);
    const questionEditorPage = new QuestionEditorPage(page);
    const addScaleToAnswers = new AddScaleToAnswersSection(page);
    const wrapperCreateNewAssessment = new WrapperCreateNewAssessment(page);
    // await createAssessment.goto();
    // await createIntegrityAssessment.insertName('QA integrity Extended ' + new Date().toLocaleString());
    // await createIntegrityAssessment.createNewAssessment('Integrity Extended')
    // await createIntegrityAssessment.setOtherSettings();
    // await createIntegrityAssessment.clickSaveButton();
    // await createIntegrityAssessment.getSaveMessage();
    

    // await page.pause()
    // await wrapperCreateNewAssessment.gotoAssessmentPage();
    // await wrapperCreateNewAssessment.createAssessmentWithScalesAndQuestions('Integrity');
    // await assessmentEditorTabs.navigateToQuestions();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Date',['1qq','2'],integrityExtendedScales,88,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Dates range',['1gg','2'],integrityExtendedScales,35,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Free text',['1ff','2'],integrityExtendedScales,22,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion(); 
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Multiple choice',['1ee','2'],integrityExtendedScales,11,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('No answers',['1dd','2'],integrityExtendedScales,33,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Single choice',['1cc','2'],integrityExtendedScales,44,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Video answer',['1bb','2'],integrityExtendedScales,55,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Yes-No',['1aa','2'],integrityExtendedScales,77,undefined);
    // await questionEditorPage.gotoQuestionMainPage();
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Drag and Drop',['1zz','2'],integrityExtendedScales,88,undefined);
    
    // await questionEditorPage.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Confirm info','Confirm info',undefined,integrityExtendedScales,33,undefined);
    
    
    // await page.goto('https://34.165.52.158/ac/#/assessment/936748755020777811/questions');
    // await questionPage.clickAddQuestion();
    // await questionEditorPage.createQuestionnaireWithSingleChoiceAndFreeText('Questionnaire','Questionnaire',integrityExtendedScales,3,undefined);
    
    
    
    
    // await questionEditorPage.AddQuestionAndAnswersAndConnectScale('Free text',undefined,integrityExtendedScales,66,undefined);
    
    // await questionEditorPage.createQuestionnaireWithSingleChoiceAndFreeText('Questionnaire','Questionnaire',integrityExtendedScales,3,undefined);
   
   
   
   
    // await assessmentList.editAssessment('QA integrity Extended 24/06/2024, 9:40:24')
    
    
    
    
    
    
   
   
   
   
   
   










    // await assessmentEditorTabs.navigateToScales();
    // await scalesPage.checkAndFillThePopulationPercentageTable();
    // await scalesPage.addScaleForIntegrityAndExtendedScore();



    // await page.waitForTimeout(9000);


    // await scalesPage.addScaleForIntegrityExtended();



    // await scalesPage.fillThePopulationRates();
    // await scalesPage.chooseScaleNameAndType('Alcohol');
    // await scalesPage.selectScaleNormForIntegrity('אמינות');






    // const scalesPage = new AssessmentEditorScalesTab(page);
    // await scalesPage.goto('QA Extended09/06/2024, 11:28:40');
    // await scalesPage.fillThePopulationPercentageTableInIntegrityExtended();
    // await scalesPage.saveAllTheFieldsInThePopulationPercentageTable();



    // Delete automation assessment (delete the first assessment every time)    
    // const assementPage = new AssessmentsPage(page);
    // await assementPage.goto()
    // for (let index = 0; index < 22; index++) {
    //     await assementPage.page.locator('body > div._veritas > section.main-content > div > div > div.nano-content > div > div > div > div > table > tbody:nth-child(2) > tr > td.table-content__data.tbl__padding.no-wrap.text-right > i').click();
    //     await assementPage.page.locator('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-footer.ng-scope > button.button.button-blue__light.ng-scope.zz-dialog-default-focus > span').click();
    //     await assementPage.page.waitForTimeout(1000)}




























});