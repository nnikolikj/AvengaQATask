import 'dotenv/config';
import { Page } from 'playwright';

/**
 * Navigates to the specified base URL using the provided Playwright page instance.
 *
 * @param {Page} page - The Playwright page instance used for navigation.
 * @throws {Error} Throws an error if the APP_BASE_URL environment variable is not defined.
 */
export const navigate = async (page: Page) => {
    const baseUrl = process.env.APP_BASE_URL;

    if (!baseUrl) {
        throw new Error('APP_BASE_URL is not defined');
    }
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
};
