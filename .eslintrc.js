module.exports = {
  extends: "airbnb-base",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
    },
  },
  settings: {
    "import/extensions": ["js"],
  },
  rules: {
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: "always",
        ObjectPattern: "never",
        ImportDeclaration: "never",
        ExportDeclaration: "never",
      },
    ],
    extensions: [".js", ".jsx"],
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    allowAllPropertiesOnSameLine: true,
  },
};
