import { test, expect } from '@playwright/test';
import { navigate } from '../src/helpers';
import { AuthenticationPage } from '../src/pages/authentication/authenticationPage';
import { ProductsPage } from '../src/pages/products/productsPage';
import { CartPage } from '../src/pages/cart/cartPage';
import { CheckoutPage } from '../src/pages/checkout/checkoutPage';

test.describe('Checkout Flow Tests', () => {
    test.beforeEach(async ({ page }) => {
        await navigate(page);
        const authPage = new AuthenticationPage(page);
        await authPage.authorizeOnSite('standard_user', 'secret_sauce');
    });

    test('complete checkout successfully', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        await productsPage.addProductToCartByIndex(0);
        await page.goto(process.env.APP_BASE_URL + '/cart.html');
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('Nikola', 'Nikolikj', '1300');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        const confirmation = await checkoutPage.getOrderConfirmation();
        expect(confirmation.toLowerCase()).toContain('thank you for your order');
    });

    test('checkout shows error for missing fields', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        await productsPage.addProductToCartByIndex(0);
        await page.goto(process.env.APP_BASE_URL + '/cart.html');
        await cartPage.clickCheckout();
        await checkoutPage.clickContinue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: First Name is required');
    });
});
