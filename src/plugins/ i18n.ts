import { type CompileError, createI18n, type MessageCompiler, type MessageContext } from 'vue-i18n'
import IntlMessageFormat from 'intl-messageformat'

import en from '../locales/en'
import zh from '../locales/zh'

const messageCompiler: MessageCompiler = (message, { locale, key, onError }) => {
	if (typeof message === 'string') {
		/**
		 * You can tune your message compiler performance more with your cache strategy or also memoization at here
		 */
		const formatter = new IntlMessageFormat(message, locale)
		return (ctx: MessageContext) => {
			return formatter.format(ctx.values) as string
		}
	} else {
		/**
		 * for AST.
		 * If you would like to support it,
		 * You need to transform locale messages such as `json`, `yaml`, etc. with the bundle plugin.
		 */
		if (onError) {
			onError(new Error('not support for AST') as CompileError)
		}
		return () => key
	}
}

export const i18n = createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		en,
		zh
	},
	messageCompiler
})
