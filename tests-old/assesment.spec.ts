import { test, expect, Page } from '@playwright/test'
import AssessmentsPage from '../pages/configurator/assessments/assessment.page'
import AssessmentEditorTabsPage from '../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page'
import AssessmentListSection from '../pages/configurator/assessments/assessment list/assessmentList.page'

test.describe('ASSESSMENT TEST', () => {
    let thisPage: Page
    let assessmentsPage: AssessmentsPage
    let assessmentsList: AssessmentListSection 
    let name = 'meby assessment ' + Date.now()


    test.beforeEach(async ({ page }) => {
        thisPage = page
        assessmentsPage = new AssessmentsPage(page)
        assessmentsList = new AssessmentListSection(page)
        await assessmentsPage.goto()
    })



    test('create assessment', async () => {
        const assessmentCreationPage = await assessmentsPage.clickAddNewAssessment()
        await assessmentCreationPage.insertName(name)
        await assessmentCreationPage.clickSaveButton()
        const result = await assessmentCreationPage.getSaveMessage()
        console.log(result);
        expect(result).toBeTruthy()
    })

    test('edit assessment', async ({}) => {
        const editorTabs =  await assessmentsList.editAssessment('meby assessment 1713171710481')
        const questions = await editorTabs.navigateToQuestions()
        const questionEditor = await questions.clickAddQuestion()
        await questionEditor.insertQuestionName(`question test 2`)
        await questionEditor.clickAddAnswer()
        await questionEditor.insertAnswer('answer 111')

        await questionEditor.addScale('some',7,'Always Green')
        await questionEditor.addScale('אלכוהול',10,'Sometimes Red')
        await questionEditor.addScale('some',2,'Sometimes Red')
        await questionEditor.deleteScale(2)

        await thisPage.waitForTimeout(30000)
    })

    test('add question', async () => {
        const editorTabs = await assessmentsPage.addNewAssessment(name)
        const questions = await editorTabs?.navigateToQuestions()
        await questions?.addQuestion('question test 1', ['answer 1', 'answer 2'])

    })
    // test.afterEach(async ({ page }) => {
    // await page.waitForTimeout(30000)
    // await page.close()
    // })
})