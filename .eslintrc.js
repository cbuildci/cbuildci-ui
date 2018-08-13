module.exports = {
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    plugins: [
        'redux-saga',
        'react',
        'jsx-a11y',
        'import',
    ],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        // Possible Errors
        'no-cond-assign': 'off',
        'no-extra-parens': [
            'off',
            'all',
            {
                nestedBinaryExpressions: true,
                returnAssign: true,
                ignoreJSX: 'all',
                enforceForArrowConditionals: false,
            },
        ],
        'no-template-curly-in-string': 'warn',
        'valid-jsdoc': [
            'error',
            {
                prefer: {
                    return: 'returns',
                    exception: 'throws',
                    prop: 'property',
                    arg: 'param',
                    argument: 'param',
                    func: 'function',
                    desc: 'description',
                },
                preferType: {
                    Function: 'function',
                    Object: 'object',
                    Boolean: 'boolean',
                    Number: 'number',
                    String: 'string',
                    NULL: 'null',
                },
                requireReturn: false,
                requireReturnType: false,
                requireParamDescription: false,
                requireReturnDescription: false,
            },
        ],

        // Best Practices
        'block-scoped-var': 'error',
        curly: [
            'warn',
            'all',
        ],
        'default-case': 'warn',
        'dot-location': [
            'warn',
            'property',
        ],
        'dot-notation': 'warn',
        eqeqeq: [
            'error',
            'always',
            {
                null: 'ignore',
            },
        ],
        'guard-for-in': 'warn',
        'no-caller': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-implicit-coercion': [
            'warn',
            {
                boolean: true,
                number: true,
                string: true,
                allow: [
                    '!!',
                ],
            },
        ],
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-labels': 'error',
        'no-multi-spaces': [
            'warn',
            {
                ignoreEOLComments: true,
            },
        ],
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-octal': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unused-expressions': [
            'warn',
            {
                allowShortCircuit: false,
            },
        ],
        'no-useless-call': 'warn',
        'no-useless-concat': 'warn',
        'no-useless-escape': 'warn',
        'no-useless-return': 'warn',
        'no-void': 'warn',
        'no-with': 'error',
        'prefer-promise-reject-errors': 'error',
        radix: [
            'warn',
            'as-needed',
        ],
        'wrap-iife': [
            'warn',
            'inside',
        ],
        yoda: 'warn',

        // Strict mode
        strict: [
            'error',
            'global',
        ],

        // Variables
        'no-label-var': 'warn',
        'no-shadow-restricted-names': 'warn',
        'no-undef-init': 'warn',
        'no-use-before-define': [
            'warn',
            {
                functions: false,
                classes: true,
            },
        ],

        // Node
        'handle-callback-err': 'off',
        'no-buffer-constructor': 'error',
        'no-mixed-requires': 'warn',
        'no-new-require': 'warn',
        'no-path-concat': 'warn',
        'no-sync': 'off',

        // Stylistic Issues
        'array-bracket-newline': [
            'warn',
            'consistent',
        ],
        'array-bracket-spacing': 'warn',
        'block-spacing': 'warn',
        'brace-style': [
            'warn',
            'stroustrup',
            {
                allowSingleLine: true,
            },
        ],
        'comma-dangle': [
            'warn',
            'always-multiline',
        ],
        'comma-spacing': 'warn',
        'comma-style': [
            'warn',
            'last',
        ],
        'computed-property-spacing': 'warn',
        'consistent-this': [
            'warn',
            '_this',
        ],
        'eol-last': 'warn',
        'func-call-spacing': 'warn',
        'func-name-matching': [
            'warn',
            {
                includeCommonJSModuleExports: false,
            },
        ],
        'func-names': [
            'warn',
            'as-needed',
        ],
        'function-paren-newline': [
            'warn',
            'consistent',
        ],
        'id-length': [
            'off',
            {
                min: 2,
                exceptions: [
                    'i',
                ],
            },
        ],
        indent: [
            'warn',
            4,
            {
                MemberExpression: 1,
                SwitchCase: 1,
            },
        ],
        'jsx-quotes': 'warn',
        'key-spacing': 'warn',
        'keyword-spacing': 'warn',
        'linebreak-style': 'warn',
        'max-len': [
            'error',
            {
                code: 200,
                ignoreComments: true,
            },
        ],
        'max-statements-per-line': 'warn',
        'new-cap': [
            'warn',
            {
                newIsCap: true,
                capIsNew: false,
            },
        ],
        'new-parens': 'warn',
        'no-array-constructor': 'warn',
        'no-lonely-if': 'warn',
        'no-mixed-spaces-and-tabs': 'warn',
        'no-multiple-empty-lines': [
            'warn',
            {
                max: 1,
                maxEOF: 1,
                maxBOF: 0,
            },
        ],
        'no-new-object': 'warn',
        'no-trailing-spaces': 'warn',
        'no-unneeded-ternary': 'warn',
        'no-whitespace-before-property': 'warn',
        'object-curly-newline': [
            'warn',
            {
                consistent: true,
            },
        ],
        'object-curly-spacing': [
            'warn',
            'always',
        ],
        'object-property-newline': [
            'warn',
            {
                allowAllPropertiesOnSameLine: true,
            },
        ],
        'one-var': [
            'warn',
            'never',
        ],
        'one-var-declaration-per-line': [
            'error',
            'initializations',
        ],
        'operator-linebreak': [
            'warn',
            'before',
            {
                overrides: {
                    '=': 'after',
                    '*=': 'after',
                    '/=': 'after',
                    '+=': 'after',
                    '-=': 'after',
                    '%=': 'after',
                    '**=': 'after',
                    '<<=': 'after',
                    '>>=': 'after',
                    '>>>=': 'after',
                    '&=': 'after',
                    '^=': 'after',
                    '|=': 'after',
                },
            },
        ],
        'padding-line-between-statements': [
            'warn',
            {
                blankLine: 'always',
                prev: 'directive',
                next: '*',
            },
            {
                blankLine: 'any',
                prev: 'directive',
                next: 'directive',
            },
        ],
        'quote-props': [
            'warn',
            'as-needed',
        ],
        quotes: [
            'warn',
            'single',
            {
                avoidEscape: true,
            },
        ],
        'semi-spacing': 'warn',
        semi: 'warn',
        'semi-style': 'warn',
        'space-before-blocks': [
            'warn',
            'always',
        ],
        'space-before-function-paren': [
            'warn',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'ignore',
            },
        ],
        'space-in-parens': 'warn',
        'space-infix-ops': 'warn',
        'space-unary-ops': [
            'warn',
            {
                words: true,
            },
        ],
        'spaced-comment': 'warn',
        'switch-colon-spacing': 'warn',
        'unicode-bom': 'warn',

        // ECMAScript 6
        'arrow-parens': [
            'warn',
            'always',
        ],
        'arrow-spacing': 'error',
        'implicit-arrow-linebreak': [
            'warn',
            'beside',
        ],
        'no-useless-computed-key': 'error',
        'no-duplicate-imports': [
            'error',
            {
                includeExports: true,
            },
        ],
        'template-curly-spacing': 'error',

        // ES6 Import
        'import/imports-first': 0,
        'import/newline-after-import': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': 2,
        'import/no-webpack-loader-syntax': 0,
        'import/prefer-default-export': 0,

        // React
        'react/jsx-uses-vars': 1,
        'react/jsx-closing-tag-location': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-filename-extension': 0,
        'react/jsx-no-target-blank': 0,
        'react/require-default-props': 0,
        'react/require-extension': 0,
        'react/self-closing-comp': 0,
        'react/sort-comp': 0,

        // Redux-Saga
        'redux-saga/no-yield-in-race': 2,
        'redux-saga/yield-effects': 2,

        // jsx-a11y
        'jsx-a11y/aria-props': 2,
        'jsx-a11y/heading-has-content': 0,
        'jsx-a11y/label-has-for': 2,
        'jsx-a11y/mouse-events-have-key-events': 2,
        'jsx-a11y/role-has-required-aria-props': 2,
        'jsx-a11y/role-supports-aria-props': 2,
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js',
            },
        },
    },
};
