import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // tsconfig уже отключает проверки неиспользуемых переменных
      '@typescript-eslint/no-unused-vars': 'off',
      // require() используется в tailwind.config.ts для плагинов
      '@typescript-eslint/no-require-imports': 'off',
      // пустые интерфейсы встречаются в сгенерированном коде Lovable
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)
