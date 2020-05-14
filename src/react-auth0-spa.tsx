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

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

type Auth0ClientProps = {
  onRedirectCallback?(result: RedirectLoginResult): void;
} & Auth0ClientOptions;

export const Auth0Context = React.createContext<string | null>(null);

export const Auth0Provider: React.FC<Auth0ClientProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
}) => {
  return <div>1</div>;
};

export default Auth0Provider;
