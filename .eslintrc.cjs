module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "es6": true,
    "node": true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "airbnb/base",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["node_modules", "dist", "build"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    "babelOptions": {
      "presets": ["@babel/preset-react"]
    }
  },
  plugins: ['react-refresh', "react", "jsx-a11y", 'prettier', "import"],
  rules: {
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': 'warn',
    'no-console': 'off',
    'spaced-comment': 'off',
    // "linebreak-style": [0, "unix"],
    "linebreak-style": ["error", "windows"],
    "import/prefer-default-export": "off",
    "arrow-body-style": "off",
    "operator-linebreak": "off",
    "no-empty-function": "off",
    "quotes": ["error", "single"],
    "default-param-last": ["off"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "import/no-unresolved": [2, { "caseSensitive": false }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "import/order": [
      2,
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always"
      }
    ],
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "always-multiline",
      "exports": "only-multiline",
      "functions": "only-multiline"
    }],
    "semi": "error",
    "no-plusplus": "off",
    "eol-last": "off",
    "implicit-arrow-linebreak": 'off',
    // "implicit-arrow-linebreak": ["error", "beside"],
//        "prettier/prettier": [
//            "error",
//            {
//                "endOfLine": "crlf"
//            }
//        ],
    "max-len": ["error", 120, {
      "ignoreUrls": true
    }],
    "no-tabs": "off",
    "no-alert": "warn",
    "prefer-destructuring": "off",
    "indent": ["off"],
    "no-param-reassign": "off",
    "object-curly-newline": "off",
    "prefer-const": ["error", {
      "destructuring": "all",
      "ignoreReadBeforeAssign": false
    }],
    "jsx-a11y/click-events-have-key-events": "off"
  },
  settings: {
    react: {
      version: "detect"
    },
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".jpg"],
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  }
}
