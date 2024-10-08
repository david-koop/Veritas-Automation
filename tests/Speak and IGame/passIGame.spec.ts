import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage, { generateRandomNumbers } from '../../pages/organization side/addCandidate.page';
import PlayerEntering from '../../pages/player/playerEntering';
import PlayerInTest from '../../pages/player/playerInTest';
import IGamePlayer from '../../pages/player/IGameAndSpeakPlayer';



let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'  //'QA DAVID PP DEMO'
const positionName = 'Automation IGame'
let id = generateRandomNumbers() + ' AUTO'


test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    // await context.close();
});



test('create candidate with IGame', async () => {
    const addCandidatePage = new AddCandidatePage(page)


    await addCandidatePage.goto(organizationName)

    //Adding ID and verification that it is unique
    let idAvailable = false

    while (!idAvailable) {
        idAvailable = await addCandidatePage.fillAndCheckId(id)

        if (!idAvailable) {
            id = generateRandomNumbers() + ' AUTO'
        }
    }

    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePage.save()
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
});



test('entering player and pass IGame', async () => {
    const playerLogin = new PlayerInTest(page, id = '333222')
    const catchNewPage = page.waitForEvent('popup');

    await playerLogin.goto()

    const newPage = await catchNewPage
    const iGamePage = new IGamePlayer(newPage)
    await iGamePage.page.pause()


    /* ------------------------------------------- Assert --------------------------------------------------------*/
    // await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
});