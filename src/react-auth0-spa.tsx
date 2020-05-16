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

export const Auth0Context = React.createContext<Auth0ClientContextType>(
  undefined!
);

export const Auth0Provider: React.FC<Auth0ProviderProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client?.loginWithPopup(params);
    } catch (error) {
      console.log(error);
    } finally {
      setPopupOpen(false);
    }
  };

  return <div>1</div>;
};

export default Auth0Provider;
