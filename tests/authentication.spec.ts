import { test, expect } from '@playwright/test';
import {AuthenticationPage} from "../src/pages/authentication/authenticationPage";
import {navigate} from "../src/helpers";
import users from "../src/data/users"

test.describe('User Login Scenarios', () => {
  for (const user of users) {
    test(`${user.username} login test`, async ({ page }) => {
      await navigate(page);
      const authPage = new AuthenticationPage(page);
      await authPage.authorizeOnSite(user.username, 'secret_sauce');

      if (user.shouldSucceed) {
        await page.waitForLoadState('networkidle', { timeout: 15000 });
        await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
      } else {
        await expect(page.locator('.error-message-container')).toBeVisible();
      }
    });
  }
});
