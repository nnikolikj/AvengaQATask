import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly orderConfirmationText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.locator('[data-test="error"]');
        this.orderConfirmationText = page.locator('.complete-header');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() ?? '';
    }

    async getOrderConfirmation(): Promise<string> {
        return await this.orderConfirmationText.textContent() ?? '';
    }
}
