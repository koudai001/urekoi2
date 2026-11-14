import { expect, test } from "@playwright/test";

test("トップに見出しと登録・ログインの入口が出る", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('a[href="/signup"]')).toBeVisible();
  await expect(page.locator('a[href="/login"]')).toBeVisible();
});
