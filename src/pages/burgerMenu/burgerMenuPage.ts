import { Page, Locator } from '@playwright/test';

export class BurgerMenuPage {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly menuPanel: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.menuPanel = page.locator('.bm-menu-wrap');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
        await this.menuPanel.waitFor({ state: 'visible' });
    }

    async clickAbout(): Promise<void> {
        await this.aboutLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    async clickResetAppState(): Promise<void> {
        await this.resetAppStateLink.click();
    }

    async isMenuVisible(): Promise<boolean> {
        return await this.menuPanel.isVisible();
    }
}
