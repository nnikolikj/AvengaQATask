import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productCards: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productImages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productImages = page.locator('.inventory_item_img img');
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }

    async areImagesVisible(): Promise<boolean> {
        const count = await this.productImages.count();
        for (let i = 0; i < count; i++) {
            if (!(await this.productImages.nth(i).isVisible())) return false;
        }
        return true;
    }

    // Returns the add/remove button inside a product card by index
    getProductButtonByIndex(index: number): Locator {
        return this.productCards.nth(index).locator('button.btn_inventory');
    }

    async addProductToCartByIndex(index: number): Promise<void> {
        await this.getProductButtonByIndex(index).click();
    }

    async removeProductFromCartByIndex(index: number): Promise<void> {
        await this.getProductButtonByIndex(index).click();
    }

    async getProductButtonText(index: number): Promise<string> {
        return (await this.getProductButtonByIndex(index).textContent())?.trim() ?? '';
    }
}
