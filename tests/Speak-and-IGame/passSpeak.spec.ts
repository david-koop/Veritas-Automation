import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage, { generateRandomNumbers } from '../../pages/organization side/addCandidate.page';
import PlayerInTest from '../../pages/player/playerInTest';
import IGamePlayer from '../../pages/player/IGameAndSpeakPlayer';

let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'
const positionName = 'Automation Speak'
let id = generateRandomNumbers() + ' AUTO'

test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    // await context.close();
});



test('create candidate with Speak', async () => {
    const addCandidatePage = new AddCandidatePage(page)


    await addCandidatePage.goto(organizationName)

    await addCandidatePage.generateAndFillID(id)
    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePage.save()
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
});

test('entering player and pass Speak', async () => {
    const playerLogin = new PlayerInTest(page, id = '33322')
    const catchNewPage = page.waitForEvent('popup');

    await playerLogin.goto()

    const newPage = await catchNewPage
    const speakPage = new IGamePlayer(newPage)

    await speakPage.startSpeakTest()

    const speakUrl = 'https://assessment.speaknow.co/#/assessments/quality-test'
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    expect(speakPage.page.url()).toEqual(speakUrl)
});