import { expect, test } from '@playwright/test'
import AssessmentGroupsPage from '../pages/configurator/assessment groups/assessmentGroups.page'

test.describe('ASSESSMENT GROUP TEST', () => {

    test('test 1', async ({ page }) => {
        const assessGroups = new AssessmentGroupsPage(page)
        await assessGroups.goto()
        // await assessGroups.editGroup('tzv mod report')
        await assessGroups.searchForGroup('tzv mod report')
        await assessGroups.editGroup('tzv mod report')
        page.pause()
    })

})