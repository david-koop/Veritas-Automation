import { expect, selectors } from "@playwright/test";
import BasePage from "../../../../../global/base/Base.page";
import AssessmentEditorTabsPage from "../assessmentEditorTabs.page";
import waitForSaveMessage from "../../../../../global/utils/waitForMessage";
import { assessmentType } from "../../../assessments/assessment creation/assessmentCreation.page";




export const integrityExtendedScales = ['Alcohol', 'Good Impression', 'Self-control', 'Personality-Integrity Total']// 'Conformity', 'Employment stability', 'Safety', 'Responsibility', 'Drugs', 'Theft', 'Reliability'];
export const integritySEScales = ['Impulsiveness', 'Risk-taking', 'Potential for personal risk', 'Manipulative behavior', 'Phishing awareness'];
export const personalityScales = ['Self-control', 'Conformity', 'Dominance', 'Good Impression'];
export const skillsScales = ['Skills'];
export const skillsIGameScales = ['IGame main score', 'IGame Analytical Ability', 'IGame Quick Thinking'];
export const skillsSpeakScales = ['Speak main score'];



class AssessmentEditorScalesTab extends BasePage {

    $ = {
        populationRatesBtn: this.page.locator('.pr-link.ng-scope'),
        pencilIcon: this.page.locator('.icon-pencil'),
        savePopulationFieldIcon: this.page.locator('.icon-save'),
        percentageField: this.page.locator('.population-rate__label__input'),
        populationRatesDoneBtn: this.page.locator('[data-ng-click="onOk()"]'),
        populationRow: this.page.locator('tr[ng-if*="data.editRows[row.id]"]'),

        addScaleBtn: this.page.locator('.button.button-text__green.ng-scope').filter({ hasText: 'Add Scale' }),
        scaleTypeList: this.page.locator('.ellipsis.ng-scope[ng-if="!scale.ct_scale_type_id"]'),
        scaleNameField: this.page.locator('#scaleName'),
        selectNormList: this.page.locator('.ellipsis.ng-scope[ng-if="!states.asmScale.activeId[asm.id].scale[scale.id].normId"]'),
        openScaleField: this.page.locator('.show-short'),
        id_nullScaleFieldText: this.page.locator('//span[@class="scales-subtype text-standard ng-binding"]').getByText('id_null'),
        normList: this.page.locator('[ng-if="!states.asmScale.activeId[asm.id].scale[scale.id].normId"]'),
        getNormItem: (normName: string) => {
            const parent = this.page.locator('.custom-dropdown-menu__item.ng-scope').filter({ hasText: normName }).first()

            return {
                parent,
                onOffBtn: parent.locator('.ng-scope').filter({ hasText: 'On' })
            }
        },

        saveScaleBtn: this.page.locator('[ng-click="save($event)"]'),
        theRightPlusBtnInScale: this.page.locator('.pull-right.btn-group.dropdown'),
        gameScoreRightPlusBtnInScale: this.page.locator('div[class="is-game-type ng-scope"] div[class="pull-right btn-group dropdown"] button[type="button"]'),
        scaleFinalScoreRightPlusBtnInScale: this.page.locator('div[class="ng-scope is-game-type"] div[class="pull-right btn-group dropdown"] button[type="button"]'),
        greenRightBtnInScale: this.page.locator('div[class="pull-right btn-group dropdown open"] li[class="ng-scope green"]'),
        yellowRightBtnInScale: this.page.locator('div[class="pull-right btn-group dropdown open"] li[class="ng-scope yellow"]'),
        redRightBtnInScale: this.page.locator('div[class="pull-right btn-group dropdown open"] li[class="ng-scope red"]'),
        idealRangeFromInput: this.page.locator('input[z-data="norm.range_from"]'),
        idealRangeToInput: this.page.locator('input[z-data="norm.range_to"]'),
        successMessage: this.page.locator('alert span[translate="notices.dataSavedSuccessfully"]'),


    }
    async goto(assessmentName: string) {
        const assessmentEditor = new AssessmentEditorTabsPage(this.page)
        await assessmentEditor.goto(assessmentName)
        await assessmentEditor.navigateToScales()
    }

    private async fillThePopulationPercentageTableInIntegrityExtended() {
        await this.$.populationRatesBtn.click();

        const list = await this.$.populationRow.all()
        let counter = 1;

        for (const item of list) {
            await item.locator(this.$.pencilIcon).click()
            await item.locator(this.$.percentageField).click()
            await item.locator(this.$.percentageField).fill(counter + '')
            await item.locator(this.$.savePopulationFieldIcon).click()
            counter += 3
            if (counter == 79) {
                counter = 100
            }
        }

    }

    private async fillThePopulationRates() {
        await this.fillThePopulationPercentageTableInIntegrityExtended();
        await this.$.populationRatesDoneBtn.click();
        await waitForSaveMessage(this.page, this.$.populationRatesDoneBtn)
    }

    // This is the function that will be the most useful
    async checkAndFillThePopulationPercentageTable() {
        await this.$.populationRatesBtn.click();
        await this.$.populationRow.first().waitFor({ state: "visible" })
        const firstPercentageField = this.page.locator('span[ng-bind="row.percentage"]').first();
        if (await firstPercentageField.innerText() !== '') {
            await this.page.keyboard.press('Escape')
        } else {
            await this.page.keyboard.press('Escape')
            await this.fillThePopulationRates()
        }
    }

   
    private async selectScaleNameAndType(scaleTypeName: string) {
       await this.$.addScaleBtn.click();
        if (await this.$.id_nullScaleFieldText.first().isVisible()) {
            await this.$.openScaleField.click()
        }

        await this.$.scaleTypeList.click();

        await this.page.getByText(scaleTypeName, { exact: true }).first().click();
        await this.$.scaleNameField.click();
        await this.$.scaleNameField.fill(scaleTypeName);
    }


    private async selectScaleNormForAllAssessment(normName: string) {
        await this.$.normList.click();
        const normItem = this.$.getNormItem(normName);
        await normItem.onOffBtn.click()
        await normItem.parent.click()
    }


    private async addColorsForScaleInRegularIntegrity() {
        await this.$.theRightPlusBtnInScale.click();
        await this.$.greenRightBtnInScale.click();
        await this.$.theRightPlusBtnInScale.click();
        await this.$.yellowRightBtnInScale.click();
        await this.$.theRightPlusBtnInScale.click();
        await this.$.redRightBtnInScale.click();
    }


    private async addColorsForScaleInIntegritySocialEngineering() {
        if (await this.page.locator('div[class="is-game-type ng-scope"]').isVisible()) {

            await this.$.gameScoreRightPlusBtnInScale.click();
            await this.$.greenRightBtnInScale.click();
            await this.$.gameScoreRightPlusBtnInScale.click();
            await this.$.yellowRightBtnInScale.click();
            await this.$.gameScoreRightPlusBtnInScale.click();
            await this.$.redRightBtnInScale.click();
            await this.$.scaleFinalScoreRightPlusBtnInScale.click();
            await this.$.greenRightBtnInScale.click();
            await this.$.scaleFinalScoreRightPlusBtnInScale.click();
            await this.$.yellowRightBtnInScale.click();
            await this.$.scaleFinalScoreRightPlusBtnInScale.click();
            await this.$.redRightBtnInScale.click();
        } else {
            await this.addColorsForScaleInRegularIntegrity();
        }

    }




    async saveScale() {
        await this.$.saveScaleBtn.click();
        await waitForSaveMessage(this.page, this.$.saveScaleBtn);
    }





    // This is the function that will be the most useful
    async addScaleForIntegrityAndExtendedScore() {
        let scaleNormForIntegrityExtended = 'אמינות'
        for (let i = 0; i < integrityExtendedScales.length; i++) {
            await this.selectScaleNameAndType(integrityExtendedScales[i]);
            await this.selectScaleNormForAllAssessment(scaleNormForIntegrityExtended);
            if (await this.$.theRightPlusBtnInScale.isVisible()) {
                await this.addColorsForScaleInRegularIntegrity();
            }


            //this "if" is for the error in veritas that allow to create scale with norm like skills/personality 
            if (await this.$.idealRangeFromInput.isVisible()) {
                await this.$.idealRangeFromInput.fill('3');
                await this.$.idealRangeToInput.fill('8');
            }



        }
        await this.saveScale()
    }

    // add || 'integrity' for the variable scaleNorm...
    async addScaleForIntegritySocialEngineering() {
        let scaleNormForIntegritySE = 'אמינות'
        for (let i = 0; i < integritySEScales.length; i++) {
            await this.selectScaleNameAndType(integritySEScales[i]);
            await this.selectScaleNormForAllAssessment(scaleNormForIntegritySE);
            await this.addColorsForScaleInIntegritySocialEngineering();
        }
        await this.saveScale()
    }


    async addScaleForPersonality() {
        let scaleNormForPersonality = 'אישיות מקסיקו'
        await this.addScaleAndNorm(personalityScales, scaleNormForPersonality)
        await this.saveScale()
    }
    async addScaleForSkills() {
        await this.addScaleAndNorm(skillsScales)
        await this.saveScale()
    }
    async addScaleForSkillsIGame() {
        await this.addScaleAndNorm(skillsIGameScales)
        await this.saveScale()
    }

    async addScaleForSkillsSpeak() {
        await this.addScaleAndNorm(skillsSpeakScales)
        await this.saveScale()
    }

    private async addScaleAndNorm(scales: Array<string>, norm?: string) {
        const scaleNorm = norm || 'AMPQ LATAM'

        for (const scale of scales) {
            await this.selectScaleNameAndType(scale);
            await this.selectScaleNormForAllAssessment(scaleNorm);
            await this.$.idealRangeFromInput.fill('3');
            await this.$.idealRangeToInput.fill('8');
        }
    }


    // this is the most used function
    async navigateToScaleTabAndAddScalesAndNormToAssessment(assessmentType: assessmentType) {
        const assessmentEditor = new AssessmentEditorTabsPage(this.page)
        await assessmentEditor.navigateToScales()
        const [response] = await Promise.all([
           await assessmentEditor.page.waitForResponse(response => 
              response.url() === 'https://34.165.119.202/api/clients/get_orgs_list' &&
              response.status() === 200 
            ),]);
        switch (assessmentType) {
            case 'Integrity':
                await this.addScaleForIntegrityAndExtendedScore();
                break
            case 'Integrity Extended':
                await this.checkAndFillThePopulationPercentageTable();
                await this.addScaleForIntegrityAndExtendedScore();
                break
            case 'Integrity Social Engineering':
                await this.addScaleForIntegritySocialEngineering();
                break
            case 'Personality':
                await this.addScaleForPersonality();
                break
            case 'Skills':
                await this.addScaleForSkills();
                break
            case 'Skills IGame':
                await this.addScaleForSkillsIGame();
                break
            case 'Skills Speak':
                await this.addScaleForSkillsSpeak();
                break
            //Note for undefined
            default:
                console.log('undefined assessment type')

        }


    }
}

export default AssessmentEditorScalesTab