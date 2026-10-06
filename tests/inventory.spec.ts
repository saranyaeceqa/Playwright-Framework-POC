import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utilities/userTestData';
import { productData } from '../utilities/productTestData';

test.describe('Inventory Workflow', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });
 
  test('Order successfully placed!', async () => {

    // Inventory
    await inventoryPage.verifyInventoryPage();

    // Add product
    await inventoryPage.addBackpackToCart();

    await inventoryPage.verifyProductAddedToCart();

    // Cart
    await inventoryPage.openCart();

    await inventoryPage.verifyCartPage();

    await inventoryPage.verifyProductInCart(
      productData.products.backpack.name
    );

    // Checkout
    await inventoryPage.clickCheckout();

    await inventoryPage.verifyCheckoutPage();

    await inventoryPage.enterCheckoutInformation(
      productData.checkout.validCustomer.firstName,
      productData.checkout.validCustomer.lastName,
      productData.checkout.validCustomer.postalCode
    );

    // Order overview
    await inventoryPage.continueToOverview();

    // Finish order
    await inventoryPage.finishOrder();

    // Confirmation
    await inventoryPage.verifyOrderCompleted();
  });
});
