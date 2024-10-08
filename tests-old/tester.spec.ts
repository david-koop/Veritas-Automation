import { expect, test, chromium } from '@playwright/test';
import ConfiguratorNavbarPage from '../pages/configurator/configuratorNavbar.page';
import LoginPage from '../pages/login/login.page';
import SettingsTabsPage from '../pages/configurator/settings/settingsNavbar.page';
import PositionListSection from '../pages/configurator/settings/positions/list/positionList.page';
import PositionsTab from '../pages/configurator/settings/positions/positionsTab.page';
import assessGroupEditorPage from '../pages/configurator/assessment groups/assessmentGroupEditor.page';
import { Button } from '../global/base/Base.page';
import AssessmentGroupsPage from '../pages/configurator/assessment groups/assessmentGroups.page';
import AssessmentsPage from '../pages/configurator/assessments/assessment.page';

test('TESTING THE TESTS', async ({ page }) => {
    const home = new ConfiguratorNavbarPage(page)
    await home.goto()
    await home.navigateToAssessments()
    // await home.clickAddNewAssessment()
    await page.waitForTimeout(20000)
    // await page.context().storageState({ path: 'storageState.json' })
    // await home.navigateToAssessments()

    // await page.goto('https://ama.am-test.com/')
    // await page.pause()
    // const search =new Button(page,'[title="חיפוש"]')
    // await page.locator('[title="חיפוש"]').fill('Adam Milo')
    // await search.fill('Adam Milo')
    // await page.pause()
    // const login = new LoginPage(page);
    // await login.goto();
    // const congNav = await login.login();
    // const settingsTabs = await congNav.navigateToSettings()

    // const positions = await settingsTabs.navigateToPositions();
    // const res = await positions.addPosition();
    // expect(res).toBeTruthy()

    // const list = new PositionListSection(page);
    // await list.goto();
    // await list.deleteAllMebyPosition()
    // const positionName = 'meby position ' + Date.now()
    // const groupName = 'meby group ' + Date.now()

    // const position = new PositionsTab(page)``
    // const assessGroupEditor = new assessGroupEditorPage(page)

    // await position.goto()
    // await position.addPosition(positionName)

    // await page.context().clearCookies()

    // await assessGroupEditor.goto(groupName)
    // await assessGroupEditor.positions.add(positionName)
    // await assessGroupEditor.saveChanges()``

    // await page.goto('https://gemini.google.com/?hl=en')
    // await page.waitForTimeout(10000);
    // const sidebar = new SidebarPage(page);
    // await sidebar.goto();

    // await sidebar.navigateToDashboard()
    // await sidebar.navigateToAssessments();
    // await sidebar.navigateToParallelAssessments();
    // await sidebar.navigateToAssessGroups();
    // await sidebar.navigateToGroupReports();
    // await sidebar.navigateToSettings();
    // await sidebar.navigateToDashboard()


    // const settingsPage = new SettingsPage(page);
    // await settingsPage.goto();
    // const positionsPage = await settingsPage.clickPositions();
    // await positionsPage.clickAddPosition()
    // await settingsPage.positions.addPosition('meby qa newPos'+Date.now())
    // await check position is created
    // expect(await settingsPage.positions.addPositionWindow.checkSaveMessage()).toBeTruthy()


    // await page.waitForTimeout(10000);    
    // expect(1).toBe(1);

})