import js from "@eslint/js";

export default [
  js.configs.recommended,
   {
    ignores: ["dist/**"],
  },
  {
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        alert: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
  },
];
