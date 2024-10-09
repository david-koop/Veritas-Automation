import AddCandidatePage from "../../pages/organization side/addCandidate.page";
import browser from "../BrowserManager";

const addCandidate = async (id: string, orgName: string, posName: string) => {
    const page = await browser.launch();
    const customerPage = new AddCandidatePage(page)
    await customerPage.goto(orgName)
    await customerPage.addPosition(posName)
    await customerPage.fillAndCheckID(id)
    await customerPage.fillCandidateInfo('QA' + id, 'QA', 'male')
    await customerPage.save()
    await browser.close(page);
}

export default addCandidate