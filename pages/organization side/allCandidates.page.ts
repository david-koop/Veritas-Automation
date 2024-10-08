import { idText } from "typescript"
import BasePage from "../../global/base/Base.page"
import OrgNavbarPage from "./OrgNavbar.page"


class AllCandidatePage extends BasePage {
    $ = {

        futureCandidatesTab: this.page.locator('[translate="customer.position.futureCandidates"]'),
        searchField: this.page.locator('[ng-model="search"]'),
        candidateRow: this.page.locator('.text-standard.no-wrap.p10'),
        check: this.page.locator('#candidateFuture'),

        //send link
        sendLinkForCandidateButton: this.page.locator('.button.visibility-hidden .icon-send-link'),
        sendLinkForMarkedButton: this.page.locator('.button-simple .icon-send-link'),
        emailButton: this.page.locator('label[for="email"]'),
        smsButton: this.page.locator('label[for="sms"]'),
        sendButton: this.page.locator('button[ng-click="ok()"]'),

        sendLinkMessage: this.page.locator('alert span[translate="linkSentSuccessfully"]'),

        exclamationIcon:this.page.locator('.glyphicon-exclamation-sign'),





    }

    async goto(orgName: string) {
        const prevPage = new OrgNavbarPage(this.page)
        await prevPage.goto(orgName)
        await prevPage.navigateToAllCandidates()
        //navigate
    }

    async goToFutureCandidates() {
        await this.$.futureCandidatesTab.click()
    }

    async searchCandidate(id: string) {
        await this.$.searchField.click()
        await this.$.searchField.fill(id)
        await this.page.keyboard.press('Enter')


    }

    // need to get out the element from the function
    async markAllCandidate() {
        await this.$.searchField.waitFor({state:'visible'}); // wait for some element to slow the automation for candidates selected

        // using 'evaluate' JavaScript to find the checkbox
        await this.page.evaluate(() => {
            const checkbox = document.getElementById('candidateFuture');
            if (checkbox) {
                checkbox.click();
            }
        })
    }
    async openSendLinkForAllMarkedCandidates(){
        await this.$.sendLinkForMarkedButton.click();
    }

    async openSendLinkForTheFirstCandidate(){
        const firstRow =  this.$.candidateRow.nth(0);
        await firstRow.hover()
        await firstRow.locator(this.$.sendLinkForCandidateButton).click();
    }

    async selectSendingLinkMethod(method: 'Email' | 'SMS') {
      
        if (method === 'Email') {
            await this.$.emailButton.check()
        } else {
            await this.$.smsButton.check()
        }

        await this.$.sendButton.click()
    }


    

}

export default AllCandidatePage