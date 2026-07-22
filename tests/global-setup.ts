import type { FullConfig } from "@playwright/test";
import { resetAdmin } from "./helpers/reset-admin";

async function globalSetup(_config: FullConfig) {
  await resetAdmin();
}

export default globalSetup;
