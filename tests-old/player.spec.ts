import { expect, test } from '@playwright/test'
import PlayerInTest, { PlayerEntering } from '../pages/player/playerInTest'
import LoginPage from '../pages/login/login.page'
import catchNewPage from '../global/utils/catch new page'
import URLs from '../URLs'
import AddCandidatePage from '../pages/organization side/addCandidate.page'

test.describe('PLAYER TESTS', () => {
    let playerEnter: PlayerEntering
    let player: PlayerInTest

    test.beforeEach(async ({ page }) => {
        // player = new PlayerInTest(page)
        // await playerEnter.goto()
    })


    test('test entering', async ({ page }) => {
        playerEnter = new PlayerEntering(page)
        await playerEnter.goto()
        await playerEnter.login()
        await playerEnter.enterId('123')

        await page.pause()
    })

    test('player from entering to runner', async ({ page }) => {
        playerEnter = new PlayerEntering(page)
        await playerEnter.goto()
        await playerEnter.login()
        const player = await playerEnter.enterId('313606313')
        page = player.page
        await player.run()
        expect(player.page.isClosed()).toBeTruthy()
    })

    test('run the player for id', async ({ page }) => {
        const ID = 'שאלהההה'

        const player = new PlayerInTest(page, ID)
        await player.goto()
        await player.run()
    })

    // test('create new and run', async ({ page }) => {
    //     const ID = 'אשכול בלי שאלה'

    //     const addNewCandidate = new AddCandidatePage(page)
    //     await addNewCandidate.goto('')

    //     const player = new PlayerInTest(page, ID)
    //     await player.goto()
    //     await player.run()
    // })

    test('player by preview', async ({ page }) => {
        const login = new LoginPage(page)
        await login.goto()
        await login.login()
        await page.waitForURL(URLs.configurator.dashboard)
        await page.goto('/ac/#/assessment/936748755003514284/questions')

        const button = page.locator('button:has-text("Preview")')
        const playerPage = await catchNewPage(page, button, false)

        const player = new PlayerInTest(playerPage,'')
        await player.run()
        expect(player.page.isClosed()).toBeTruthy()

    })

})