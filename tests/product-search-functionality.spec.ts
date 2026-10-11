import { test, expect } from '@playwright/test';

test.describe('2 Product Search Functionality', () => {
  test('Search matching products and recover from no results', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const searchField = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    const catalogProducts = page.locator('.product:not(.showPriceWrapper)');
    const appleProduct = catalogProducts.locator('.product-name', { hasText: /^Apple - 1 Kg$/ });
    const broccoliProduct = catalogProducts.locator('.product-name', { hasText: /^Brocolli - 1 Kg$/ });

    await expect(searchField).toBeVisible();
    await expect(catalogProducts).toHaveCount(30);

    await searchField.fill('apple');
    await expect(appleProduct).toBeVisible();
    await expect(catalogProducts).toHaveCount(1);

    await searchField.fill('zzzznotfood');
    await expect(page.getByText('Sorry, no products matched your search!', { exact: true })).toBeVisible();
    await expect(catalogProducts).toHaveCount(0);

    await searchField.clear();
    await expect(appleProduct).toBeVisible();
    await expect(broccoliProduct).toBeVisible();
    await expect(catalogProducts).toHaveCount(30);
  });
});
