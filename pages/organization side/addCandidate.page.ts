import BasePage from '../../global/base/Base.page';
import OrgNavbarPage from './OrgNavbar.page';
import waitForLoading from '../../global/utils/waitForLoading';
import { privateDecrypt } from 'node:crypto';

class AddCandidatePage extends BasePage {

    $ = {

        // positions
        addPositionButton: this.page.locator('button[ng-click="openAddPositionsModal()"]'),
        positionItem: this.page.locator('li.positionItem'),
        searchPositionInput: this.page.locator('input[ng-model="search"]'),

        findPosition: async (positionName: string) => {
            await this.$.searchPositionInput.fill(positionName)
            return this.$.positionItem.filter({ hasText: positionName })
        },
        positionsDoneButton: this.page.locator('button[ng-click="ok()"]'),

        //Extra time popup
        openExtraTimePopup: this.page.locator('.icon.icon-extratime'),


        // get the assessment row (not used yet)
        getAssessmentsArea: (assessmentName: string) => {
            const parent = this.page.locator('[ng-show="assess_type.assess_group_content.length"]').filter({ hasText: assessmentName }).first()

            return {
                parent,
                additionalTimeField: parent.locator('input[type="text"]'),
            }
        },

        // String for the 'evaluate'
        pauseCheckbox: ('input[ng-model="item.assessments.exception.pause"]'),
        okPopupButton: this.page.locator('button[ng-click="ok()"]'),


        //additionalInfo
        additionalInfoButton: this.page.locator('[class="inline-block ng-scope"]'),
        emailField: this.page.locator('#email'),
        phoneNumberField: this.page.locator('#contactPhone4'),

        // candidate info
        idInput: this.page.locator('input[ng-model="candidate.id_value"]'),
        firstNameInput: this.page.locator('input#firstName'),
        lastNameInput: this.page.locator('input#lastName'),
        genderMaleRadioButton: this.page.locator('label[for="male_radio_btn"]'),
        genderFemaleRadioButton: this.page.locator('label[for="female_radio_btn"]'),

        //Date picker
        inputDateField: this.page.locator('input[uib-datepicker-popup="dd/MM/yyyy"]'),

        // mass upload 
        massUploadButton: this.page.locator('h4[ng-click="toggleImport()"]'),
        importFromFileBTN: this.page.locator('#massImportFile'),
        successMassImport: this.page.locator('div[class="modal-header success"] span.ng-scope'),

        // save
        cameraNotRequiredCheckbox: this.page.locator('label[for="cameraUseNotRequired"]'),
        addButton: this.page.locator('button[ng-click="save()"]'),
        addAndStartButton: this.page.locator('button[ng-click="saveAndStart()"]'),
        successMessage: this.page.locator('alert span[translate="notices.dataSavedSuccessfully"]'),

        //error massage
        NoTestsError: this.page.locator('[class="alert alert-warning ng-scope"]'),

        //send link
        sendLinkButton: this.page.locator('button[ng-click="sendLink()"]'),
        emailButton: this.page.locator('label[for="email"]').getByText('Email', { exact: true }),
        smsButton: this.page.locator('label[for="sms"]'),
        sendButton: this.page.locator('button[ng-click="ok()"]'),
    }





    async goto(organizationName: string) {
        const prevPage = new OrgNavbarPage(this.page)
        await prevPage.goto(organizationName)
        await prevPage.$.addCandidateLink.click()
    }


    async addPosition(positionName: string) {
        await this.$.addPositionButton.click(); // open positions modal
        const pos = await this.$.findPosition(positionName); // click on the position
        await pos.click()
        await this.$.positionsDoneButton.click(); // close positions modal
    }


    async markTheFirstCheckboxPauseOption() {
        await this.$.openExtraTimePopup.click();
        const addExtraTime = this.$.getAssessmentsArea('Integrity');
        await addExtraTime.additionalTimeField.waitFor({ state: 'visible' });

        // using 'evaluate' JavaScript to find the checkbox
        await this.page.evaluate((selector) => {
            const checkbox = document.querySelector(selector) as HTMLInputElement;
            if (checkbox) {
                checkbox.click();
            }
        }, this.$.pauseCheckbox);

        await this.$.okPopupButton.click()
    }



    async fillAndCheckID(id: string) {
        await this.$.idInput.fill(id)
        await this.page.keyboard.press('Enter')

        await this.page.waitForTimeout(1000)
        await waitForLoading(this.page)

        const disabled = await this.$.idInput.getAttribute('disabled')

        if (disabled === 'disabled') { // candidate with such id already exists
            await this.page.goBack()
            await this.page.waitForTimeout(1000)
            await waitForLoading(this.page)

            return false
        }

        return true

    }

    async generateAndFillID(id: string) {
        let idAvailable = false

        while (!idAvailable) {
            idAvailable = await this.fillAndCheckID(id)

            if (!idAvailable) {
                id = generateRandomNumbers() + ' AUTO'
            }
        }
    }


    async fillCandidateInfo(firstName: string, lastName: string, gender: 'male' | 'female') {
        await this.$.firstNameInput.fill(firstName)
        await this.$.lastNameInput.fill(lastName)
        if (gender === 'male') {
            await this.$.genderMaleRadioButton.click()
        } else {
            await this.$.genderFemaleRadioButton.click()
        }
    }


    async fillPhoneNumberAndEmail(phoneNumber: string, email: string) {
        await this.$.additionalInfoButton.click()
        await this.$.emailField.fill(email)
        await this.$.phoneNumberField.fill(phoneNumber)
    }





    //the date should be dd/mm/yyyy format
    async changeTheTestDate(Date: string) {
        await this.$.inputDateField.click()
        await this.$.inputDateField.clear()
        await this.$.inputDateField.fill(Date)
        await this.$.inputDateField.click()

    }


    async massUpload() {
        await this.$.massUploadButton.click()
        await this.$.importFromFileBTN.setInputFiles('mass upload/candidate_import.xlsx')

    }


    async save() {
        if (await this.$.cameraNotRequiredCheckbox.isVisible()) {
            await this.$.cameraNotRequiredCheckbox.check()
        }
        await this.$.addButton.click()
    }


    async saveAndStart() {
        if (await this.$.cameraNotRequiredCheckbox.isVisible()) {
            await this.$.cameraNotRequiredCheckbox.check()
        }
        await this.$.addAndStartButton.click()
    }

    async sendLink(method: 'Email' | 'SMS') {
        if (await this.$.cameraNotRequiredCheckbox.isVisible()) {
            await this.$.cameraNotRequiredCheckbox.check()
        }

        await this.$.sendLinkButton.click()
        if (method === 'Email') {
            await this.$.emailButton.check()
        } else {
            await this.$.smsButton.check()
        }
        await this.$.sendButton.click()
    }




}




export function generateRandomNumbers(): number {

    return Math.floor(Math.random() * 900000) + 100000;
}
const randomSixNumbers = generateRandomNumbers();
console.log(randomSixNumbers);




export function getYesterday(): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return formatDate(yesterday);
}

export function getTomorrow(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return formatDate(tomorrow);
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default AddCandidatePage
