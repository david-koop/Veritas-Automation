import { Page, expect } from '@playwright/test'
import PLAYER_LOCATORS, { URL } from './playerLocators'
import PlayerEntering from './playerEntering';
import clickNext from './screens/clickNext';
import freeTextScreen from './screens/freeText';
import allScreens from './allScreens';



class PlayerInTest {

    page: Page
    id: string

    constructor(page: Page, id: string) {
        this.page = page
        this.id = id
    }


    async goto() {
        await this.page.goto(URL);
        const playerEntering = new PlayerEntering(this.page)
        await playerEntering.login()
        const newPlayer = await playerEntering.enterId(this.id)
        this.page = newPlayer.page
        return newPlayer.page
    }

    async run() {
        console.log('starting player...');
        
        while (!(this.page.isClosed() || this.page.url().includes('nplayer/end'))) {
            try {
                await this.chooseWhatToDoNext()
                // await this.page.waitForTimeout(1000) // some rest 
            }
            catch (err) {
                console.log('error');
                console.log(err);
            }
        }
        if (this.page.url().includes('nplayer/end')) {
            console.log('✅finished!😁')

            //???
            expect(this.page.url()).toContain('nplayer/end')
            await this.page.close()
        }
    }

    async chooseWhatToDoNext() {

        for (const screen of allScreens) {
            // console.log('trying ' + screen.name);
            const locator = screen.getLocator(this.page).first()

            if (await locator.isVisible()) {

                console.log('---------');
                console.log(screen.name);
                console.log('---------');

                await screen.handler(this.page)

                //todo remove this?
                // await this.page.waitForTimeout(100)
                // break
            }
        }
    }

    async aaa (){
        const a = await this.page.locator('app-answer-text-position').first().textContent()
        await this.page.locator('app-answer-text-position').first().highlight()
        await this.page.locator('app-answer-text-position').first().click()
        await this.page.locator('[title="Done button"]').first().click()

        console.log(a)

    }


}

export { PlayerEntering }
export default PlayerInTest