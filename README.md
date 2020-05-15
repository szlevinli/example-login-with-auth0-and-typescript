# React With Typescript

这个项目用于理解和学习如何使用 [Typescript] 编写 [React] 项目。

## 创建项目

使用 [Create React App] 创建 [React] 项目，这里创建一个名为
_example-react-with-typescript_ 的 [React] 项目。

```bash
yarn create react-app example-react-with-typescript --template typescript
```

## 配置 ESLint

在项目根目录下执行如下命令

```bash
./node_modules/.bin/eslint --init
```

创建 ESLint 的配置文件 <u>.eslintrc.js</u>

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

当在文件中 `import type/interface` 后，eslint 会报 no-unused-vars 错，根据
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

## Import Type or Interface

```typescript
// import interface or type from other file
import {
  Auth0ClientOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  IdToken,
  GetIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  RedirectLoginResult,
  Auth0Client,
} from '@auth0/auth0-spa-js';
```

## Context

在使用 [React] 的 `createContext()` 创建 Context 时，
如何使用 [Typescript] 定义 Context 的 type 是比较棘手的。

这是因为 Context 的值是在 `Context.Provider` 组件中，通过属性 `value` 来传递的，
在使用 `createContext()` 时通常没有办法提供一个初始值，此时可以通过如下语法绕开这个问题

```typescript
const exampleContext = React.createContext<string>(undefind!);
```

```typescript
// 典型的 type 定义
// 该 type 定义了 Context 的结构
// 当使用 Context.Provider 组件时，其属性 value 必须遵循该定义
type Auth0ClientContextType = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup(options: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<void>;
  getIdTokenClaims(options?: GetIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(options: RedirectLoginOptions): Promise<void>;
  getTokenSilently(
    options?: GetTokenSilentlyOptions
  ): Promise<string | undefined>;
  getTokenWithPopup(options?: GetTokenWithPopupOptions): Promise<string>;
  logout(options?: LogoutOptions): void;
};

// 创建 Context
const Auth0Context = React.createContext<Auth0ClientContextType>(undefind!)
```

## 参考

- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#basic-cheatsheet-table-of-contents)

[react]: https://reactjs.org/
[typescript]: https://www.typescriptlang.org/
[create react app]: https://create-react-app.dev/
