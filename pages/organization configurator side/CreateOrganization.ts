import BasePage, { clickAndFill } from "../../global/base/Base.page";
import ConfiguratorNavbarPage from "../configurator/configuratorNavbar.page";

type IDType = 'ID' | 'CC' | 'CE'


class CreateOrganization extends BasePage {

    $ = {
        addOrganizationBtn: this.page.locator('.create-organization.ng-scope'),
        orgNameField: this.page.locator('#orgName'),
        orgIDDropdown: this.page.locator('span[ng-if="!customers.amq_customers_code_types.length"]'),

        getIDRow: (IDType: IDType) => {
            const parent = this.page.locator('div.b-form-group.ng-scope li.custom-dropdown-menu__item.clearfix').filter({ has: this.page.getByText(IDType, { exact: true }) })
            return {
                parent,
                name: parent.locator('.pull-left.ng-binding'),
                setAsDefault: parent.locator('button.button-grey.ng-scope')
            }
        },

        countryDropdown: this.page.locator('.ellipsis.ng-scope[ng-if="!mainLocation.ct_country_id"]'),
        QACountryName: this.page.locator('[ng-repeat="state in dicts.states"]').getByText('QA', { exact: true }),
        distributorDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.distributors"]'),
        distributorQA: this.page.locator('[ng-repeat="distributor in dicts.distributors"]').getByText('QA', { exact: true }),
        selectCurrencyDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.selectCurrency"]'),
        USDCurrency: this.page.locator('[data-ng-repeat="currencie in dicts.amq_currencies"]').getByText('USD', { exact: true }),
        clientManagerDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.clientManager"]'),
        QAClientManager: this.page.locator('[ng-repeat="client_manager in dicts.client_managers"]').getByText('QA', { exact: true }),
        bnNumberField: this.page.locator('#bnNumber'),
        orgCityField: this.page.locator('#orgCity'),
        orgAddressField: this.page.locator('#orgAddress'),
        contactPositionField: this.page.locator('#position'),
        orgContactNameField: this.page.locator('#orgContactName'),
        orgContactPhoneField: this.page.locator('#orgContactPhone'),
        orgContactEmailField: this.page.locator('#orgContactEmail'),
        sectorDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.selectSector"]'),
        sectorTypeInternalTesting: this.page.locator('[ng-click="setSector(sector)"]').getByText('Internal Testing', { exact: true }),
        selectTypeDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.selectType"]'),
        TypeInternalTesting: this.page.locator('[ng-click="setOrgType(orgType)"]').getByText('Internal Testing', { exact: true }),
        selectSizeDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.selectSize"]'),
        sizeTypeInternalTesting: this.page.locator('[ng-click="setOrgSize(orgSize)"]').getByText('Internal Testing', { exact: true }),
        selectMarketDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.selectMarket"]'),

        getMarketRow: (marketType: string) => {
            const parent = this.page.locator('div.btn-form-group.open li').filter({ has: this.page.getByText(marketType, { exact: true }) })
            return {
                parent,
                name: parent.locator('.pull-left.ng-binding'),
                setAsDefault: parent.locator('button.button-grey.ng-scope')
            }
        },
        selectClassificationDropdown: this.page.locator('[translate="dialogs.EditOrganization.dropdown.selectClassification"]'),

        getClassificationRow: (classificationType: string) => {
            const parent = this.page.locator('div.btn-form-group.open li').filter({ has: this.page.getByText(classificationType, { exact: true }) })
            return {
                parent,
                name: parent.locator('.pull-left.ng-binding'),
                setAsDefault: parent.locator('button.button-grey.ng-scope')
            }
        },
        chooseLangsByName: this.page.locator('[z-select-langs="interfaceLangs"] [ng-click="state.select1Id = lang.id"]'),
        addInterfaceLang: this.page.locator('[z-select-langs="interfaceLangs"] [ng-click="addInterfaceLang($event, state.select1Id)"]'),
        contentLangsByName: this.page.locator('[z-select-langs="contentLangs"] [ng-click="state.select1Id = lang.id"]'),
        addContentLang: this.page.locator('[z-select-langs="contentLangs"] [ng-click="addInterfaceLang($event, state.select1Id)"]'),

        uploadLogoInput: this.page.locator('input[type="file"]'),
        saveBtn: this.page.locator('[ng-click="save()"]'),



    }

    async goto() {
        const configuratorNavbarPage = new ConfiguratorNavbarPage(this.page)
        await configuratorNavbarPage.goto()
        await configuratorNavbarPage.openOrganizations()
    }


    async clickAddOrganization() {

        await this.$.addOrganizationBtn.click()
    }

    async fillNewOrganizationForm(orgName: string, IDType: IDType, bnNumber: string, city: string, address: string, contactPosition: string,
        contactName: string, contactPhone: string, contactEmail: string, marketType: string, classificationType: string, languages: string[]) {

        await clickAndFill(this.$.orgNameField, orgName)
        await this.$.orgIDDropdown.click()

        const IDTypeLocator = this.$.getIDRow(IDType)
        await IDTypeLocator.name.click()
        await IDTypeLocator.setAsDefault.click()

        await this.$.countryDropdown.click()
        await this.$.QACountryName.click()
        await this.$.selectCurrencyDropdown.click()
        await this.$.USDCurrency.click()
        await this.$.distributorDropdown.click()
        await this.$.distributorQA.click()
        await this.$.clientManagerDropdown.click()
        await this.$.QAClientManager.click()
        await clickAndFill(this.$.bnNumberField, bnNumber)
        await clickAndFill(this.$.orgCityField, city)
        await clickAndFill(this.$.orgAddressField, address)
        await clickAndFill(this.$.contactPositionField, contactPosition)
        await clickAndFill(this.$.orgContactNameField, contactName)
        await clickAndFill(this.$.orgContactPhoneField, contactPhone)
        await clickAndFill(this.$.orgContactEmailField, contactEmail)
        await this.$.sectorDropdown.click()
        await this.$.sectorTypeInternalTesting.click()
        await this.$.selectTypeDropdown.click()
        await this.$.TypeInternalTesting.click()
        await this.$.selectSizeDropdown.click()
        await this.$.sizeTypeInternalTesting.click()
        await this.$.selectMarketDropdown.click()

        const marketLocator = this.$.getMarketRow(marketType)
        await marketLocator.name.click()
        await marketLocator.setAsDefault.click()

        await this.$.selectClassificationDropdown.click()

        const classificationLocator = this.$.getMarketRow(classificationType)
        await classificationLocator.name.click()
        await classificationLocator.setAsDefault.click()

        for (const lang of languages) {

            await this.$.chooseLangsByName.getByText(lang).click()
            await this.$.addInterfaceLang.click()
            await this.$.contentLangsByName.getByText(lang).click()
            await this.$.addContentLang.click()
        }


    }



}
export default CreateOrganization