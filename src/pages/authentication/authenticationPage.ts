import {Page} from "@playwright/test";
import {Locator} from "@playwright/test";

export class AuthenticationPage {
    readonly page: Page;
    readonly username : Locator;
    readonly password: Locator;
    readonly login: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder("username");
        this.password = page.getByPlaceholder("password");
        this.login = page.getByRole('button', { name: 'Login' });
    }

    async inputUserName (username: string) {
        await this.username.fill(username)
    }

    async inputPassword (password: string) {
        await this.password.fill(password)
    }

    async clickLogIn () {
        await this.login.click()
    }

    async authorizeOnSite(username: string, password: string) {
        await this.inputUserName(username)
        await this.inputPassword(password)
        await this.clickLogIn()
    }
}
