import { test, expect } from '@playwright/test';
import { navigate } from '../src/helpers';
import { AuthenticationPage } from '../src/pages/authentication/authenticationPage';
import { BurgerMenuPage } from '../src/pages/burgerMenu/burgerMenuPage';
import {ProductsPage} from "../src/pages/products/productsPage";

test.describe('Burger Menu Tests', () => {
    test.beforeEach(async ({ page }) => {
        await navigate(page);
        const authPage = new AuthenticationPage(page);
        await authPage.authorizeOnSite('standard_user', 'secret_sauce');
    });

    test('open burger menu', async ({ page }) => {
        const burgerMenu = new BurgerMenuPage(page);
        await burgerMenu.openMenu();
        expect(await burgerMenu.isMenuVisible()).toBe(true);
    });

    test('click About link', async ({ page }) => {
        const burgerMenu = new BurgerMenuPage(page);
        await burgerMenu.openMenu();
        await Promise.all([
            page.waitForURL(/saucelabs\.com/),
            burgerMenu.clickAbout(),
        ]);
        expect(page.url()).toContain('saucelabs.com');
    });

    test('logout redirects to login page', async ({ page }) => {
        const burgerMenu = new BurgerMenuPage(page);
        await burgerMenu.openMenu();
        await burgerMenu.clickLogout();
        await expect(page).toHaveURL(/saucedemo\.com\/$/);
    });

    test('reset app state clears cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const burgerMenu = new BurgerMenuPage(page);
        await productsPage.addProductToCartByIndex(0);
        await burgerMenu.openMenu();
        await burgerMenu.clickResetAppState();
        await page.reload();
        const badge = page.locator('.shopping_cart_badge');
        expect(await badge.count()).toBe(0);
    });

});
