import { test, expect } from "@playwright/test";

test("open link", async ({ page }) => {
  await page.goto("/auth/signup");
});

// CASE 1: ĐĂNG KÝ THÀNH CÔNG
test("Đăng ký thành công", async ({ page }) => {
  await page.goto("/auth/signup");

  const fullName = page.locator('//input[@name="name"]');
  const phone = page.locator('//input[@name="phone"]');
  const email = page.locator('//input[@name="email"]');
  const password = page.locator('//input[@name="password"]');

  await fullName.fill("Nguyen Minh Phuc");
  await phone.fill("09" + Date.now().toString().slice(-8));
  await email.fill(`phuc${Date.now()}@gmail.com`);
  await password.fill("12345678");
  await page.locator('//button[@type="submit" and text()="Đăng ký"]').click();

  await expect(page).toHaveURL("/user/dashboard"); // Đăng ký thành công và chuyển hướng đến trang dashboard
});

// CASE 2: BỎ TRỐNG CÁC TRƯỜNG KHI ĐĂNG KÝ
test("Đăng ký không điền đủ thông tin", async ({ page }) => {
  await page.goto("/auth/signup");

  await page.locator('//button[@type="submit" and text()="Đăng ký"]').click();

  await expect(
    page.locator('//span[text()="Vui lòng nhập Họ và tên"]'),
  ).toBeVisible();

  await expect(
    page.locator('//span[text()="Vui lòng nhập Số điện thoại"]'),
  ).toBeVisible();

  await expect(
    page.locator('//span[text()="Vui lòng nhập Mật khẩu"]'),
  ).toBeVisible();
});

test("Tìm kiếm", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("textbox", { name: "Tìm sản phẩm (vd: cà phê phin" })
    .fill("cà phê");
  await page
    .getByRole("textbox", { name: "Tìm sản phẩm (vd: cà phê phin" })
    .press("Enter");
  await expect(page).toHaveURL("/search?query=cà%20phê");
});
