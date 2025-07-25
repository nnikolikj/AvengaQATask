import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly removeButtons: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.removeButtons = page.locator('button:has-text("Remove")');
        this.checkoutButton = page.locator('button#checkout');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.itemNames.allTextContents();
    }

    async getCartItemPrices(): Promise<string[]> {
        return await this.itemPrices.allTextContents();
    }

    async removeItemByIndex(index: number): Promise<void> {
        await this.removeButtons.nth(index).click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
