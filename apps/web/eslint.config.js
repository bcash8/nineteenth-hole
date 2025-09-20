import { config as baseConfig } from "@repo/eslint-config/react-internal";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...baseConfig,
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
  },
]);
