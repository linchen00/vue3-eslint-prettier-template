export default {
	js2svg: { indent: 2, pretty: true },
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false
				}
			}
		},
		'removeDimensions'
	]
}
