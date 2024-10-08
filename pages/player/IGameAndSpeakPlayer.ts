import { Page } from "@playwright/test";
import PLAYER_LOCATORS, { URL } from "./playerLocators";
import catchNewPage from "../../global/utils/catch new page";
import PlayerInTest from "./playerInTest";
import BasePage from "../../global/base/Base.page";

class IGamePlayer extends BasePage {

    $ = {
        checkboxConditions: this.page.locator('[class="mdc-checkbox__native-control"]'),
        buttonProceed: this.page.locator('[class="button__proceed"]'),
        startButton: this.page.locator('.ng-tns-c10-1.button__cancel'),
        continueButton: this.page.locator('.ng-tns-c10-5.button__submit'),


    }





    async startSpeakTest() {
        await this.page.waitForURL('https://assessment.speaknow.co/#/welcome', { waitUntil: 'domcontentloaded' })
        if (await this.$.buttonProceed.isVisible()) {
            await this.$.buttonProceed.click()
        }
        await this.$.checkboxConditions.check()
        await this.$.startButton.click()
        await this.$.continueButton.click()
    }


}

export default IGamePlayer