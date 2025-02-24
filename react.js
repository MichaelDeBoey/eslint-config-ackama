/**
 * Generates an ESLint config for React, based on the Ackama style guide
 *
 * @return {import('eslint').Linter.FlatConfig[]|import('eslint').Linter.LegacyConfig}
 */
const generateConfig = () => {
  /** @type {import('eslint').Linter.RulesRecord} */
  const rules = {
    // explicitly (re)enable this as it's disabled by eslint-config-prettier
    // and its likely our standard JS config will be used alongside this one
    'curly': 'error',

    // todo: react-hooks does not export a flat config (yet)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    'react/button-has-type': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/display-name': 'off', // todo: re-look into
    'react/forbid-foreign-prop-types': 'error',
    'react/forbid-prop-types': 'error',

    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-fragments': 'error',
    'react/jsx-handler-names': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'error',
    'react/no-danger': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-read-only-props': 'error',
    'react/prefer-stateless-function': 'error',
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true }
    ],
    'react/self-closing-comp': 'error',
    'react/state-in-constructor': ['error', 'never'],
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error'
  };

  if (process.env.ESLINT_USE_FLAT_CONFIG !== 'false') {
    /* eslint-disable n/global-require */
    const pluginJsxA11y = require('eslint-plugin-jsx-a11y');
    const pluginPrettier = require('eslint-plugin-prettier');
    const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
    const pluginReact = require('eslint-plugin-react');
    const pluginReactHooks = require('eslint-plugin-react-hooks');
    /* eslint-enable n/global-require */

    /** @type {import('eslint').Linter.FlatConfig[]} */
    const config = [
      {
        name: 'ackama/react',
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true
            }
          }
        },
        settings: {
          react: {
            version: 'detect'
          }
        },
        plugins: {
          'jsx-a11y': pluginJsxA11y,
          'prettier': pluginPrettier,
          'react': pluginReact,
          'react-hooks': pluginReactHooks
        },
        rules: {
          ...pluginJsxA11y.flatConfigs.recommended.rules,
          ...pluginJsxA11y.flatConfigs.strict.rules,
          ...pluginReact.configs.flat.recommended.rules,
          ...pluginPrettierRecommended.rules,
          ...rules
        }
      },
      {
        name: 'ackama/react/tsx',
        files: ['**/*.tsx'],
        rules: {
          'react/no-unknown-property': 'off',
          'react/prop-types': 'off',
          'react/require-render-return': 'off'
        }
      }
    ];

    return config;
  }

  /** @type {import('eslint').Linter.LegacyConfig} */
  const config = {
    env: { es2017: true },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
    extends: [
      'plugin:jsx-a11y/recommended',
      'plugin:jsx-a11y/strict',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended'
    ],
    overrides: [
      {
        files: ['*.tsx'],
        rules: {
          'react/no-unknown-property': 'off',
          'react/prop-types': 'off',
          'react/require-render-return': 'off'
        }
      }
    ],
    rules
  };

  return config;
};

module.exports = generateConfig();
