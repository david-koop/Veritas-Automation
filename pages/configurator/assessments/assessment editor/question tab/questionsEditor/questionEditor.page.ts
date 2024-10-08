import AssessmentEditorQuestionTab from "../questionTab.page"
import waitForSaveMessage from "../../../../../../global/utils/waitForMessage"
import AddScaleToAnswersSection from "./add scale to answers section/addScaleToAnswers.page"
import BasePage from "../../../../../../global/base/Base.page"
import { Locator } from "@playwright/test"
// import scales to test by assessment type
import { integrityExtendedScales, personalityScales, integritySEScales, skillsIGameScales, skillsScales, skillsSpeakScales } from '../../scales tab/scaleTab.page'
import { isRegExp } from "util/types"
import waitForLoading from "../../../../../../global/utils/waitForLoading"


export type QuestionType = 'Confirm info' | 'Date' | 'Dates range' | 'Drag and Drop' | 'Free text' | 'Multiple choice'
    | 'No answers' | 'Questionnaire' | 'Single choice' | 'Video answer' | 'Yes-No'






// todo  to add media question 







class QuestionEditorPage extends BasePage {

    $ = {
        //question
        questionTitleInput: this.page.frameLocator('iframe[title="Rich Text Area\\. Press ALT-F9 for menu\\. Press ALT-F10 for toolbar\\. Press ALT-0 for help"]').getByRole('paragraph'),
        settingsBtn: this.page.locator('span[translate="ac.questionEdit.btn.settings"]'),
        questionTypeList: this.page.locator('div[class="col-lg-6"] div[class="btn-form-group form-group__full-width dropdown"]'),
        saveChangesBtn: this.page.locator('button[ng-click="ok();"]'),

        backToQuestionMainPageButton: this.page.locator('.breadcrumb-back.ng-scope'),

        getQuestionType: (questionType: QuestionType) => this.page.locator('[ng-click="onType(item)"]').filter({ hasText: RegExp(`\\b${questionType}\\b`, `i`) }),

        addMediaInput: this.page.locator('input[type="file"]'),
        addMediaSuccessfullyMessage: this.page.locator('alert span[translate="notices.successfullyLoaded"]'),




        // answers
        addAnswerButton: this.page.locator('.at-new-item-btn'),
        answerTabs: this.page.locator('.at-menu li'),
        currentAnswerTab: this.page.locator('li.active'),
        answerInput: this.page.locator('[ng-include^="getAttachPosition(answer)"] iframe'),
        // save
        saveButton: this.page.locator('[translate="ac.questionEdit.btn.save"]'),
        exitEditor: this.page.locator('div[class="col-lg-9 col-md-9 col-sm-9 ng-scope"] li:nth-child(4)'),

        successMessage: this.page.locator('alert span[translate="notices.dataSavedSuccessfully"]'),

        //questionnaire locators
        addQuestionInQuestionnaireButton: this.page.locator('span[translate="ac.questionEdit.btn.add"]'),
        // questionInQuestionnaireTitleInput: this.page.locator('#ui-tinymce-2_ifr'),

        questionnaireMainPage: (questionName: string) => this.page.locator('a[title="<p>' + questionName + '</p>"]'),

    }

    async goto(questionName: string) {
        const questionTab = new AssessmentEditorQuestionTab(this.page)
        await questionTab.goto(questionName)
        // TODO: edit question
        //await questionTab.editQuestion
    }
    // question section
    async insertQuestionName(questionName: string) {
        console.info('insert question name: ' + questionName)


        await this.$.questionTitleInput.click()
        await this.page.keyboard.type(questionName)
    }

    private async openQuestionsTypeList() {
        await this.$.settingsBtn.click();
        await this.$.questionTypeList.click();
    }

    // This function gives the possibility to add a media question
    async addMediaToQuestion() {
     await this.$.addMediaInput.setInputFiles("./media upload/mediaQuestion1.jpg")
     await this.getSaveMessage()
    }



    // enter question type (locator)
    // private
    async selectQuestionType(questionType: QuestionType) {
        await this.openQuestionsTypeList();
        const type = this.$.getQuestionType(questionType)
        await type.click();
        await this.$.saveChangesBtn.click();
    }


    async gotoQuestionMainPage() {
        await this.$.backToQuestionMainPageButton.click();
        return new AssessmentEditorQuestionTab(this.page);
    }


    // --- answers section ---
    async clickAddAnswer() {
        console.info('click add answer button')
        await this.$.addAnswerButton.click()
    }

    async insertAnswer(answer: string) {
        console.info('insert answer: ' + answer)
        await this.$.answerInput.click()
        await this.page.keyboard.type(answer)
    }

    async chooseAnswer(num: number) {
        console.info('choose answer ' + num)
        await this.$.answerTabs.nth(num - 1).click()
    }
    // to delete
    async chooseAnswer1(num: number) {
        console.info('choose answer ' + num)
        await this.$.answerTabs.nth(num).click()
    }

    async getHowManyAnswers() {
        console.info('get answer number')
        return await this.$.answerTabs.count() - 1
    }

    // add question and answers and connect scale
    async selectQuestionTypeAndAddAnswersAndAddScalesAndSave(questionName: string, questionType: QuestionType, answers?: string[], scalesName?: Array<string>, score?: number, specialRule?: string) {
        await this.insertQuestionName(questionName);
        await this.selectQuestionType(questionType);
        console.log('trying to add ' + questionName);
        if (answers) {
            for (const answer of answers) {
                await this.clickAddAnswer();
                await this.insertAnswer(answer);
            }
        }
        const countAnswers = await this.getHowManyAnswers();
        if (countAnswers > 0) {
            for (let i = 1; i <= countAnswers; i++) {
                await this.chooseAnswer(i);
                if (scalesName) {
                    for (const scale of scalesName) {
                        await this.addScale(scale, score, specialRule);
                    }
                }
            }
        } else {
            if (scalesName) {
                for (const scale of scalesName) {
                    await this.addScale(scale, score, specialRule);

                }
            }
        }

        await this.clickSaveQuestion();
        await this.getSaveMessage();
        console.log('added ' + questionName + ' type, successfully');

    }

    async createQuestionnaireWithSingleChoiceAndFreeText(questionName: string, questionType: 'Questionnaire', scalesName?: Array<string>, score?: number, specialRule?: string,) {
        await this.insertQuestionName(questionName);
        await this.selectQuestionType(questionType);
        await this.clickAddAnswer();
        await this.$.addQuestionInQuestionnaireButton.click();
        await this.page.waitForTimeout(1500)
        await this.getSaveMessage();
        await this.page.waitForTimeout(1500)
        await this.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer1', 'answer2'], scalesName, score, specialRule);
        await this.$.questionnaireMainPage(questionName).click();
        await this.clickAddAnswer();
        await this.$.addQuestionInQuestionnaireButton.click();
        await this.page.waitForTimeout(1500)
        await this.getSaveMessage();
        await this.page.waitForTimeout(1500)
        await this.AddQuestionAndAnswersAndConnectScale('Free text', undefined, scalesName, score, specialRule);
        await this.$.questionnaireMainPage(questionName).click();
    }





    async AddQuestionAndAnswersAndConnectScale(questionType: QuestionType, answers?: string[], scalesName?: Array<string>, score?: number, specialRule?: string) {
        switch (questionType) {
            case 'Confirm info':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Confirm info', "Confirm info", undefined, scalesName, score, specialRule);
                break
            case 'Date':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Date', "Date", undefined, scalesName, score, specialRule);
                break
            case 'Dates range':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Dates range', "Dates range", undefined, scalesName, score, specialRule);
                break
            case 'Drag and Drop':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Drag and Drop', "Drag and Drop", answers, undefined, undefined, undefined);
                break
            case 'Free text':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Free text', "Free text", undefined, scalesName, score, specialRule);
                break
            case 'Multiple choice':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Multiple choice', "Multiple choice", answers, scalesName, score, specialRule);
                break
            case 'No answers':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : No answers', "No answers", undefined, undefined, undefined, undefined);
                break
            // this option with different function
            case 'Questionnaire':
                await this.createQuestionnaireWithSingleChoiceAndFreeText('question Name : Questionnaire', "Questionnaire", scalesName, score, specialRule);
                break
            case 'Single choice':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Single choice', "Single choice", answers, scalesName, score, specialRule);
                break
            case 'Video answer':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Video answer', "Video answer", undefined, scalesName, score, specialRule);
                break
            case 'Yes-No':
                await this.selectQuestionTypeAndAddAnswersAndAddScalesAndSave('question Name : Yes-No', "Yes-No", undefined, scalesName, score, specialRule);
                break
            //Note for undefined
            default:
                console.log('undefined questions type')

        }




    }






    //----------------------


    // --- add scale section ---
    async addScale(scaleName: string, score: number, spacialRule?: string) {
        await new AddScaleToAnswersSection(this.page)
            .addScale(scaleName, score, spacialRule)
    }
    async deleteScale(scaleNumber: number) {
        await new AddScaleToAnswersSection(this.page).deleteScale(scaleNumber)
    }
    // -------------------------


    // --- save section ---
    async clickSaveQuestion() {
        console.info('click save button')
        await this.$.saveButton.click()
    }
    async getSaveMessage() {
        return await waitForSaveMessage(this.page, this.$.saveButton)
    }

}

export default QuestionEditorPage