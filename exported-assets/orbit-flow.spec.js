import { test, expect } from '@playwright/test';

test.describe('ORBIT AI E2E Flow', () => {
  test('complete user journey', async ({ page }) => {
    // Navigate to app
    await page.goto('/');

    // Should show login page
    await expect(page.getByText('ORBIT AI')).toBeVisible();
    await expect(page.getByText('Continue with Google')).toBeVisible();

    // Mock login (in real test, would use test auth)
    await page.evaluate(() => {
      localStorage.setItem('orbitai_user', JSON.stringify({
        uid: 'test-user',
        displayName: 'Test User',
        email: 'test@example.com',
        photoURL: ''
      }));
    });

    // Reload to trigger auth state
    await page.reload();

    // Should now show dashboard
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('Resume Builder')).toBeVisible();

    // Test navigation to Resume Builder
    await page.getByText('Resume Builder').first().click();
    await expect(page.getByText('Create professional resumes')).toBeVisible();

    // Test navigation to Code IDE
    await page.getByText('Code IDE').first().click();
    await expect(page.getByText('Write code with AI-powered debugging')).toBeVisible();

    // Test Voice Assistant
    await page.getByText('Voice Practice').first().click();
    await expect(page.getByText('Practice speaking and get AI-powered feedback')).toBeVisible();
  });
});