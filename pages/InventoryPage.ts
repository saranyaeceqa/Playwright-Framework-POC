import { expect, Page } from '@playwright/test';

export class InventoryPage {
  private readonly pageTitle;
  private readonly inventoryContainer;
  private readonly backpackAddButton;
  private readonly backpackRemoveButton;
  private readonly cartLink;
  private readonly cartBadge;
  private readonly cartItem;
  private readonly checkoutButton;
  private readonly firstNameInput;
  private readonly lastNameInput;
  private readonly postalCodeInput;
  private readonly continueButton;
  private readonly finishButton;
  private readonly orderConfirmation;

  constructor(private readonly page: Page) {
    this.pageTitle =   this.page.locator('.title');
    this.inventoryContainer = this.page.getByRole('main');
    this.backpackAddButton = this.page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.backpackRemoveButton = this.page.getByTestId('remove-sauce-labs-backpack');
    this.cartLink =   this.page.getByTestId('shopping-cart-link');
    this.cartBadge =  this.page.getByText('1', { exact: true });
    this.cartItem =  this.page.getByText('Sauce Labs Backpack', {
      exact: true
    });
    this.checkoutButton =  this.page.getByRole('button', {
      name: 'Checkout'
    });
    this.firstNameInput = this.page.getByLabel('First Name');
    this.lastNameInput =  this.page.getByLabel('Last Name');
    this.postalCodeInput =  this.page.getByLabel('Zip/Postal Code');
    this.continueButton = this.page.getByRole('button', {
      name: 'Continue'
    });
    this.finishButton = this.page.getByRole('button', {
      name: 'Finish'
    });
    this.orderConfirmation =  this.page.getByText('Thank you for your order!', {
      exact: true
    });
  }

  // ==========================================================
  // INVENTORY METHODS
  // ==========================================================

  async verifyInventoryPage(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddButton.click();
  }

  async verifyProductAddedToCart(): Promise<void> {
    await expect(this.backpackRemoveButton).toBeVisible();
    await expect(this.cartBadge).toHaveText('1');
  }

  // ==========================================================
  // CART METHODS
  // ==========================================================

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async verifyCartPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async verifyProductInCart(productName: string): Promise<void> {
    await expect(this.cartItem).toContainText(productName);
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // ==========================================================
  // CHECKOUT METHODS
  // ==========================================================

  async verifyCheckoutPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText(
      'Checkout: Your Information'
    );
  }

  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  // ==========================================================
  // ORDER METHODS
  // ==========================================================

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyOrderCompleted(): Promise<void> {
    await expect(this.orderConfirmation).toHaveText(
      'Thank you for your order!'
    );
  }
}
