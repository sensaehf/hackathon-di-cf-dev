import { test, expect } from '@playwright/test';

test.describe('Landing Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Landing page
    await page.goto('/'); // Replace with the actual route to your Landing page
  });

  test('should display the page title and headings', async ({ page }) => {
    // Verify page title
    const pageTitle = await page.locator('h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText('File your tax return');

    // Verify section headings
    const checkTaxesHeading = await page.locator('h2', { hasText: 'Check your taxes' });
    await expect(checkTaxesHeading).toBeVisible();
  });

  test('should display introductory and filing information text', async ({ page }) => {
    // Verify introductory text
    const introText = await page.locator('text=Each year, everyone who lives in Iceland must submit a tax return.');
    await expect(introText).toBeVisible();

    // Verify filing information text
    const filingInfo = await page.locator('text=Filing your tax return is simple and secure through Ísland.is.');
    await expect(filingInfo).toBeVisible();
  });
});