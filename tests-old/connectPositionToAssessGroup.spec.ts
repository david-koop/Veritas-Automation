import { expect, test } from '@playwright/test'
import AssessmentGroupsPage from '../pages/configurator/assessment groups/assessmentGroups.page'
import assessGroupEditorPage from '../pages/configurator/assessment groups/assessmentGroupEditor.page'


test.describe('assessment groups', () => {


    test('add position', async ({ page }) => {
        const editor = new assessGroupEditorPage(page)
        const assessGroups = new AssessmentGroupsPage(page)
        
        await assessGroups.goto()
        await assessGroups.editGroup('tzv mod report')

        // await editor.positions.add('tzv personality with pit')
        // await editor.positions.add('tzv mod report')
        await editor.positions.add('TzvikaQA')
    
        // const message = await editor.saveChanges()
        // expect(message).toContain('save')
        await page.pause()
    })



})