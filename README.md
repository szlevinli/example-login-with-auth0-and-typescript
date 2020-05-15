# React With Typescript

这个项目用于理解和学习如何使用 [Typescript] 编写 [React] 项目。

## 创建项目

使用 [Create React App] 创建 [React] 项目，这里创建一个名为
_example-react-with-typescript_ 的 [React] 项目。

```bash
yarn create react-app example-react-with-typescript --template typescript
```

## 配置 ESLint

在项目根目录下执行如下命令，创建 ESLint 的配置文件 <u>.eslintrc.js</u>

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {},
};
```

### About no-unused-vars

当在文件中 import type/interface 后，eslint 会报 no-unused-vars 错，根据
[Disallow unused variables (no-unused-vars)](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md)
描述在 .eslintrc 文件中增加如下内容可以解决

```javascript
{
  // note you must disable the base rule as it can report incorrect errors
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error"]
}
```

## Functional Component

```typescript
import React, { MouseEvent, FC } from 'react';

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void;
};

const StatelessComponent: FC<Props> = ({ onClick: handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
};

export default StatelessComponent;
```

- 定义该组件所使用的 **Properties** 类型 `Props`。该定义声明了当使用
  `StatelessComponent` 组件时必须传入 `onClick` 属性
- 声明 `StatelessComponent` 组件遵循 `FC` 类型，该类型的定义如下

```typescript
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```

这里主要关注 `(props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;`
其中 `PropsWithChildren<P>` 的定义如下

```typescript
type PropsWithChildren<P> = P & { children?: ReactNode };
```

这说明除了自定义的属性类型外，会自动增加一个属性 `{ children?: ReactNode }`，也就是说，我们上面定义的

```typescript
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void;
};
```

实际等同于下面的声明

```typescript
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void;
  children?: ReactNode;
};
```

## 参考

- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#basic-cheatsheet-table-of-contents)
- [Ultimate React Component Patterns with Typescript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)

[react]: https://reactjs.org/
[typescript]: https://www.typescriptlang.org/
[create react app]: https://create-react-app.dev/
