import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import SimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import autoImportGlobals from './.eslintrc-auto-import.json'

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...autoImportGlobals.globals
			}
		},
		plugins: {
			'simple-import-sort': SimpleImportSort
		}
	},
	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
	pluginVue.configs['flat/recommended'],
	vueTsConfigs.recommended,
	skipFormatting,
	{
		rules: {
			'no-sparse-arrays': 'error',
			'no-duplicate-imports': 'error',
			'no-duplicate-case': 'error',
			eqeqeq: 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// 外部包
						['^vue', '^@?\\w'],
						// 内部包 (别名)
						['^@/'],
						// 父目录导入
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// 同级/子目录导入
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						// 样式导入
						['^.+\\.(css|scss|sass|less)$'],
						// 图片导入
						['^.+\\.(png|jpg|jpeg|gif|svg|webp)$']
					]
				}
			],
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'never',
						component: 'always'
					},
					svg: 'always',
					math: 'always'
				}
			],
			'vue/block-order': [
				'error',
				{
					order: ['script', 'template', 'style']
				}
			],
			'vue/block-lang': [
				'error',
				{
					script: {
						lang: 'ts'
					}
				}
			],
			'vue/component-api-style': [
				'error',
				['script-setup'] // "script-setup", "composition", "composition-vue2", or "options"
			],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{
					registeredComponentsOnly: false,
					ignores: []
				}
			],
			'vue/define-macros-order': [
				'error',
				{
					order: ['defineModel', 'defineProps', 'defineEmits'],
					defineExposeLast: false
				}
			],
			'vue/padding-line-between-blocks': ['error', 'always']
		}
	}
)
