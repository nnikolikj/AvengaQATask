import { test, expect } from '@playwright/test';
import { navigate } from '../src/helpers';
import { AuthenticationPage } from '../src/pages/authentication/authenticationPage';
import { ProductsPage } from '../src/pages/products/productsPage';
import { CartPage } from '../src/pages/cart/cartPage';

test.describe('Cart Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await navigate(page);
        const authPage = new AuthenticationPage(page);
        await authPage.authorizeOnSite('standard_user', 'secret_sauce');
    });

    test('add products to cart and verify cart contents', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        await productsPage.addProductToCartByIndex(0);
        await productsPage.addProductToCartByIndex(1);
        await page.goto(process.env.APP_BASE_URL + '/cart.html');
        const cartCount = await cartPage.getCartItemCount();
        expect(cartCount).toBe(2);
        const cartNames = await cartPage.getCartItemNames();
        const addedNames = await productsPage.getProductNames();
        expect(cartNames).toEqual(addedNames.slice(0, 2));
        const cartPrices = await cartPage.getCartItemPrices();
        const addedPrices = await productsPage.getProductPrices();
        expect(cartPrices).toEqual(addedPrices.slice(0, 2));
    });

    test('remove product from cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        await productsPage.addProductToCartByIndex(0);
        await page.goto(process.env.APP_BASE_URL + '/cart.html');
        await cartPage.removeItemByIndex(0);
        const countAfterRemove = await cartPage.getCartItemCount();
        expect(countAfterRemove).toBe(0);
    });
});
