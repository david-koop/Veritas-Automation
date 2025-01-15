import { Browser, Locator, Page, chromium } from "@playwright/test";

class BasePage {
    page: Page
   
    constructor(page: Page) {
        this.page = page
    }
}

class BaseLocator {
    protected page: Page
    $: Locator

    constructor(page: Page, locator: Locator | string) {
        this.page = page

        if (typeof locator === 'string') {
            this.$ = page.locator(locator)

        } else {
            this.$ = locator
        }

    }
}

class Button extends BaseLocator {
    click:Locator['click'] = this.$.click.bind(this.$)
    // click2: () =>  (this.$.click()
    isDisabled:Locator['isDisabled'] = this.$.isDisabled.bind(this.$)
    fill:Locator['fill'] = async (value: string, options?) => {this.$.fill(value, options)}
}

class Input extends BaseLocator {
    click:Locator['click'] = this.$.click.bind(this.$)
    fill:Locator['fill'] = this.$.fill.bind(this.$)

    clickAndFill = async (value: string) => {
        await this.click()
        await this.fill(value)
    }
}

class Textual extends BaseLocator {
    getText:Locator['innerText'] = this.$.innerText.bind(this.$)
}


function parentAndChildren(parent:Locator,children:Array<Locator>){
    
}

// type childLocator = [name:string, Locator]

// class ParentAndChildren extends BaseLocator {
    //     constructor(page: Page, divLocator: Locator | string, children: Array<childLocator>) {
        //         super(page, divLocator)
        
        //         for (const child of children) {
            //             const name = child[0]
            //             const locator = child[1]
            //             this[name] = this.$.locator(locator)
            //         }
            //         declare ParentAndChildren 
            //     }
            // }
            
            
            interface ItemOptions {
                title?: string
                editButton?: string
                deleteButton?: string
                
            }
            class Item extends BaseLocator {
                title?: Locator
    editButton?: Locator
    deleteButton?: Locator
    
    constructor(page: Page, divLocator: Locator | string, options: ItemOptions) {
        super(page, divLocator)
        
        if (options.title) {
            this.title = this.$.locator(options.title)
        }
        if (options.editButton) {
            this.editButton = this.$.locator(options.editButton)
        }
        if (options.deleteButton) {
            this.deleteButton = this.$.locator(options.deleteButton)
        }
    }
    
    async getTitle() {
        return await this.title?.innerText()
    }
    
    async edit() {
        await this.editButton?.click()
    }

    async delete() {
        await this.deleteButton?.click()
    }

}

async function test(){
    const a = await chromium.launch()
    const page = await a.newPage()
    
    const c = new Button(page, 'button')
    await c.fill('test',{force: true})

    // const child = new ParentAndChildren(page, 'div', [
    //     ['child1', page.locator('div')],
    //     ['child3', page.locator('div')],
    //     ['child2', page.locator('div')],
    // ])
    
    // child.child1.click()
    // const d = new Input(page, 'input')
    const z = parentAndChildren(c.$,[c.$,c.$,])
    // z.
}
// test()

export async function clickAndFill(locator: Locator, input:string) {
    await locator.click();
    await locator.fill(input)
}

export {Button, Input, Textual, Item}
export default BasePage
