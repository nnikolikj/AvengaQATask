import { test, expect } from '@playwright/test';
import { navigate } from '../src/helpers';
import { AuthenticationPage } from '../src/pages/authentication/authenticationPage';
import { ProductsPage } from '../src/pages/products/productsPage';

test.describe('Products Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await navigate(page);
        const authPage = new AuthenticationPage(page);
        await authPage.authorizeOnSite('standard_user', 'secret_sauce');
    });

    test('verify product list on inventory page', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
        const names = await productsPage.getProductNames();
        expect(names.length).toBe(count);
        const prices = await productsPage.getProductPrices();
        expect(prices.length).toBe(count);
        const imagesVisible = await productsPage.areImagesVisible();
        expect(imagesVisible).toBe(true);
    });

    test('Add and remove products from cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByIndex(0);
        await expect(productsPage.getProductButtonByIndex(0)).toHaveText('Remove');
        await productsPage.removeProductFromCartByIndex(0);
        await expect(productsPage.getProductButtonByIndex(0)).toHaveText('Add to cart');
    });
});
