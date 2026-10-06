import { test } from '../fixtures/fixtures';
import { users } from '../utilities/userTestData';

test.describe('User Login', () => {
  test('Valid user', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.verifyInventoryPage();
  });

  test('Invalid credentials', async ({ loginPage }) => {
    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await loginPage.verifyLoginError(
      'Username and password do not match any user in this service'
    );
  });


  test('Username is Empty', async ({ loginPage }) => {
    await loginPage.login(
      '',
      users.standard.password
    );

    await loginPage.verifyLoginError(
      'Username is required'
    );
  });

  test('Password is Empty', async ({ loginPage }) => {
    await loginPage.login(
      users.standard.username,
      ''
    );

    await loginPage.verifyLoginError(
      'Password is required'
    );
  });

});