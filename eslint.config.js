import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: react,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // mantém a tua regra existente (ignora vars que começam com maiúscula)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // marca variáveis usadas em JSX como usadas (resolve aviso para `motion` quando usado como <motion.div/>)
      "react/jsx-uses-vars": "error",

      // se estiveres a usar o novo JSX transform (React 17+), isto pode ficar desligado
      "react/react-in-jsx-scope": "off",
    },
  },
]);
