import { test, expect } from '@playwright/test';

test('Orders API', async ({ request }) => {
 // 1. Generate token
  const tokenResponse = await request.post(
    'https://simple-books-api.click/api-clients/',
    {
      data: {
        clientName: 'Test User',
        clientEmail: `test${Date.now()}@example.com`
      }
    }
  );

  expect(tokenResponse.status()).toBe(201);

  const tokenData = await tokenResponse.json();
  const token = tokenData.accessToken;

  console.log('Token:', token);

  // 2. Create order
  const createOrderResponse = await request.post(
    'https://simple-books-api.click/orders/',
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        bookId: 1,
        customerName: 'The Mills'
      }
    }
  );

  expect(createOrderResponse.status()).toBe(201);

  const orderData = await createOrderResponse.json();
  const orderId = orderData.orderId;

  console.log('Order ID:', orderId);

  // 3. Retrieve order
  const getOrderResponse = await request.get(
    `https://simple-books-api.click/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(getOrderResponse.status()).toBe(200);

  const order = await getOrderResponse.json();

  console.log('Order:', order);

  expect(order.id).toBe(orderId);
  expect(order.customerName).toBe('The Mills');


  // 4. Delete order
  const deleteOrderResponse = await request.delete(
    `https://simple-books-api.click/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(deleteOrderResponse.status()).toBe(204);

  console.log('Order deleted successfully');
});