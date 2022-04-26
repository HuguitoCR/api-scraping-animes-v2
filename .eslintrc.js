module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'brace-style': [
			'error',
			'1tbs',
			{ 'allowSingleLine': true }
		],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'dot-location': [
			'error',
			'property'
		],
		'comma-style': [
			'error',
			'last'
		],
		'comma-spacing': 'error',
		'space-infix-ops': 'error',
		'keyword-spacing': 'error',
		'space-before-blocks': 'error',
		'space-unary-ops': 'error',
		'space-in-parens': [
			'error',
			'never'
		],
		'arrow-spacing': [
			'warn',
			{ 'before': true, 'after': true }
		],
		'space-before-function-paren': [
			'error',
			{ 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }
		],
		'object-curly-spacing': [
			'error',
			'always'
		],
		'array-bracket-spacing': [
			'error',
			'never'
		],
		'no-shadow': [
			'error',
			{ 'allow': ['err', 'resolve', 'reject'] }
		],
		'no-multiple-empty-lines': [
			'error',
			{ 'max': 2, 'maxEOF': 0, 'maxBOF': 0 }
		],
		'no-var': 'error',
		'no-multi-spaces': 'error',
		'no-trailing-spaces': 'error',
		'no-case-declarations': 'off',
		'yoda': 'error'
	},
};
