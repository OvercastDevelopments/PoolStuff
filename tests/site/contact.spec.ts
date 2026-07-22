import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows the PoolStuff Limited NZ address block", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /contact us/i, level: 1 })).toBeVisible();
    // Scope to main because the footer also lists PoolStuff Limited + the address
    const main = page.getByRole("main");
    await expect(main.getByText(/PoolStuff Limited/).first()).toBeVisible();
    await expect(main.getByText(/Unit 17, 40 Andromeda Crescent/)).toBeVisible();
    await expect(main.getByText(/PO Box 64-354/)).toBeVisible();
  });

  test("shows the phone links with NZ international format", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: /09 274-7406/ })).toHaveAttribute(
      "href",
      "tel:+6492747406",
    );
    await expect(main.getByRole("link", { name: /027 501-2513/ })).toHaveAttribute(
      "href",
      "tel:+64275012513",
    );
  });

  test("form fields are all rendered", async ({ page }) => {
    await expect(page.getByLabel(/^Name$/)).toBeVisible();
    await expect(page.getByLabel(/^Email$/)).toBeVisible();
    await expect(page.getByLabel(/Phone/)).toBeVisible();
    await expect(page.getByLabel(/Company \/ Facility/)).toBeVisible();
    await expect(page.getByLabel(/Facility type/)).toBeVisible();
    await expect(page.getByLabel(/What can we help with/)).toBeVisible();
    await expect(page.getByLabel(/^Message$/)).toBeVisible();
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("hours block lists Mon-Fri, Saturday, Sunday", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main.getByText(/Mon.*Fri.*8am/)).toBeVisible();
    await expect(main.getByText(/Saturday.*9am/)).toBeVisible();
    await expect(main.getByText(/Sunday.*Closed/)).toBeVisible();
  });
});
