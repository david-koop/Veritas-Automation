import { expect, test } from "@playwright/test";
import OrganizationSelectPage from "../pages/organization side/organizationSelect";
import AddCandidatePage from "../pages/organization side/addCandidate.page";

test.describe('ADD CANDIDATE TESTS', () => {

    const customerName = '0 Tzvika Qa'

    test('check id', async ({ page }) => {
        const addCandidate = new AddCandidatePage(page)
        await addCandidate.goto(customerName)

        let idAvailable = false
        let counter = 4
        let id = '123'

        while (!idAvailable) {
            idAvailable = await addCandidate.fillAndCheckID(id)

            if (id === '123') expect(idAvailable).toBeFalsy()
            if (id === '1234') expect(idAvailable).toBeFalsy()
            if (id === '12345') expect(idAvailable).toBeFalsy()

            if (!idAvailable){
                id += counter
                counter++
            }
        }
        expect(id).toBe('12345678910')// id number 12345678910 is available
    })

    test('add candidate', async ({ page }) => {
        const customer = new OrganizationSelectPage(page)
        await customer.goto()
        const customerNavbar = await customer.navigateToOrgCustomer(customerName)
        const addCandidate = await customerNavbar.navigateToAddCandidate()

        await addCandidate.addPosition('QA Engineer')
        await addCandidate.fillCandidateInfo('Adam', 'Milo', 'male')
        await addCandidate.save()

        await page.pause()
    })
})