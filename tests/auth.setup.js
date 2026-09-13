import { test as setup } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("Authenticate User", async ({ page }) => {
  setup.setTimeout(60000);

  const loginPage = new LoginPage(page);

  await loginPage.login();

  await page.context().storageState({ path: authFile });
});