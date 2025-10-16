import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import globals from 'globals'
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// Configuração ESLint que será aplicada pelo plugin
const eslintConfig = [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]

// Configuração do Vite + ESLint
export default defineConfig({
  plugins: [
    react(),
    eslint({
      eslintConfig, // Passa a config acima para o plugin
      cache: false, // Opcional: para não usar cache
      include: ['src/**/*.js', 'src/**/*.jsx'], // Onde aplicar
    }),
  ],
})

