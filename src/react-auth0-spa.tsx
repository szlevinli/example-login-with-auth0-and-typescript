import React, { useEffect, useState, useContext } from 'react';
import createAuth0Client, {
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
import { createCtx } from './utils/createCtx';

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

type Auth0ProviderProps = {
  onRedirectCallback?(result: RedirectLoginResult): void;
} & Auth0ClientOptions;

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

/**
 * `useAuth0` 自定义 hook. 通过 Context 方式将 Auth0Client 实例化后的对象方法发布出去
 * `Auth0ContextProvider` Context.Provider
 */
export const [useAuth0, Auth0ContextProvider] = createCtx<
  Auth0ClientContextType
>();

export const Auth0Provider: React.FC<Auth0ProviderProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);
    };
    initAuth0();
  }, []);

  return <div>1</div>;
};

export default Auth0Provider;
