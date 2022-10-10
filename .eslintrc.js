const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "vue-eslint-parser",
    "extends": [
        "plugin:vue/vue3-essential",
        "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "prettier"
    ],
    "overrides": [],
    "parserOptions": {
        // 声明 es 版本
        "ecmaVersion": "latest",
        // 声明源码类型
        "sourceType": "module",
        // 替换原有的代码解析器
        "parser": "@typescript-eslint/parser",
        // 其他语言扩展，包含jsx，全局严格模式等
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": ["vue"],
    "rules": {
        "vue/multi-word-component-names": "warn",
        "prettier/prettier": "error",
        "import/extensions": ["error", "always", {
            "js": "never",
            "mjs": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
        }]
    }
})
