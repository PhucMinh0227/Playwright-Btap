import { test, expect } from "@playwright/test";

test("Điền đầy đủ form đăng ký", async ({ page }) => {
  await page.goto(
    "https://material.playwrightvn.com/01-xpath-register-page.html",
  );

  // Xóa dữ liệu user cũ
  await page.evaluate(() => localStorage.removeItem("users"));
  await page.reload();

  // 1. USERNAME
  const username = page.locator("//div[@id='parent']/child::input");
  await username.fill("minhphuc");

  // 2. EMAIL
  const email = page.locator("//div[@id='child']/child::input");
  await email.fill("minhphuc@example.com");

  // 3. GENDER
  const gender = page.locator(
    "//form[@id='registrationForm']/descendant::input[@value='female']",
  );
  await gender.check();

  // 4. HOBBIES
  const reading = page.locator(
    "//form[@id='registrationForm']/descendant::input[@value='reading']",
  );
  await reading.check();

  // 5. INTERESTS
  const interests = page.locator(
    "//form[@id='registrationForm']/descendant::select[@id='interests']",
  );
  await interests.selectOption(["art", "music"]);

  // 6. COUNTRY
  const country = page.locator(
    "//form[@id='registrationForm']/descendant::select[@id='country']",
  );
  await country.selectOption("canada");

  // 7. DATE OF BIRTH
  const dob = page.locator(
    "//form[@id='registrationForm']/descendant::input[@id='dob']",
  );
  await dob.fill("2005-02-27");

  // 8. PROFILE PICTURE
  const profile = page.locator(
    "//form[@id='registrationForm']/descendant::input[@id='profile']",
  );
  await profile.setInputFiles("test-data/profile-picture.jpg");

  // 9. BIOGRAPHY
  const bio = page.locator(
    "//form[@id='registrationForm']/descendant::textarea[@id='bio']",
  );
  await bio.fill("Don't judge a book by its cover.");

  // 10. RATE US
  const rating = page.locator(
    "//form[@id='registrationForm']/descendant::input[@id='rating']",
  );
  await rating.fill("4");

  // 11. FAVORITE COLOR
  const favoriteColor = page.locator(
    "//form[@id='registrationForm']/descendant::input[@id='favcolor']",
  );
  await favoriteColor.fill("#00ff00");

  // 12. NEWSLETTER
  const newsletter = page.locator(
    "//form[@id='registrationForm']/descendant::input[@id='newsletter']",
  );
  await newsletter.check();

  // 13. ENABLE FEATURE
  const toggle = page.locator("//input[@id='toggleOption']/parent::label");
  await toggle.click();

  // 14. STAR RATING
  const starRating = page.locator(
    "//form[@id='registrationForm']/descendant::div[@id='starRating']",
  );

  await starRating.click({
    position: { x: 80, y: 10 },
  });

  // 15. CUSTOM DATE
  const customDate = page.locator(
    "//form[@id='registrationForm']/descendant::input[@id='customDate']",
  );

  await customDate.evaluate((element) => {
    element.removeAttribute("readonly");
    element.value = "2026-10-07";
  });

  // 16. REGISTER
  const registerButton = page.locator(
    "//form[@id='registrationForm']/descendant::button[@type='submit']",
  );
  await registerButton.click();

  // =========================
  // EXPECT
  const userRow = page.locator(
    "//td[normalize-space()='minhphuc']/ancestor::tr",
  );

  await expect(userRow).toBeVisible();
  await expect(userRow).toContainText("minhphuc");
  await expect(userRow).toContainText("minhphuc@example.com");
  await expect(userRow).toContainText("Gender: female");
  await expect(userRow).toContainText("Hobbies: reading");
  await expect(userRow).toContainText("Country: canada");
  await expect(userRow).toContainText("Date of Birth: 2005-02-27");
  await expect(userRow).toContainText(
    "Biography: Don't judge a book by its cover.",
  );
  await expect(userRow).toContainText("Rating: 4");
  await expect(userRow).toContainText("Favorite Color: #00ff00");
  await expect(userRow).toContainText("Newsletter: Yes");
  await expect(userRow).toContainText("Enable Feature: Yes");
  await expect(userRow).toContainText("Star Rating: 4");
  await expect(userRow).toContainText("Custom Date: 2026-10-07");
});
