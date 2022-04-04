module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"no-eval": 2,
		"no-unused-vars": 0,
	},
	plugins: ["@microsoft/eslint-plugin-sdl"],
};
