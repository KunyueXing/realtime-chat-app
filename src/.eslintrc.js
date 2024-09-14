module.exports = {
  root: true,
  /*
    Defines how ESLint should parse the code.
    ecmaVersion: 2020: Specifies the version of ECMAScript (JavaScript) that your project uses. Here, 
    2020 allows for modern JS features (like optional chaining, nullish coalescing).
    sourceType: 'module': Indicates that the project uses ES Modules, which are common in modern 
    JavaScript/React projects (import/export statements).
    ecmaFeatures: { jsx: true }: This enables ESLint to parse JSX syntax, essential for React applications 
    since JSX is not standard JavaScript.
  */
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // Automatically detects the version of React you are using. This helps the React-specific ESLint
  // rules to function correctly.
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Turn off this rule for React 17+
    'react/jsx-uses-react': 'off'
  },
  /*
    Defines the environments the code is expected to run in, enabling the appropriate global variables.

    jest: true: Supports Jest testing environment, making globals like test or expect available without errors.
    browser: true: Enables browser-specific globals (e.g., window, document).
    amd: true: Enables support for AMD (Asynchronous Module Definition) modules if the project might use them.
    node: true: Enables Node.js environment globals (e.g., process, global) for backend or server-side code.
  */
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true
  },
  /*
    eslint:recommended: Enforces basic recommended ESLint rules (such as avoiding syntax errors or undefined 
    variables).
    plugin:react/recommended: Adds React-specific linting rules to enforce good practices in React code 
    (e.g., ensuring proper JSX syntax and lifecycle usage).
    plugin:prettier/recommended: Integrates Prettier with ESLint. Prettier takes care of code formatting 
    (like indentation, spacing, etc.), and this configuration ensures Prettier rules override ESLint 
    formatting rules to avoid conflicts.
  */
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    // Throws an error when there are unused variables
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    // Enforces Prettier’s rules as ESLint errors, ensuring consistent formatting.
    // {} is used to allow Prettier’s default configuration.
    // { usePrettierrc: true } ensures it respects any additional custom Prettier settings defined in your .prettierrc file.
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
}
