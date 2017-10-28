const babel = require('babel-core');

module.exports = {
	process: function (src) {
		const transformCfg = {
			presets: ['react', 
				["env", {
					"modules": false,
					"targets": {
						"browsers": ["last 2 versions"]
					}
				}]
			],
			plugins: ['transform-class-properties', 'transform-object-rest-spread'],
			env: {
				test: {
					plugins: ['transform-es2015-modules-commonjs']
				}
			}
		};
		return babel.transform(src, transformCfg).code;
	}
};