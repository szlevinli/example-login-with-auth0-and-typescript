import React, { useEffect, useState, useContext } from 'react';
import createAuth0Client, { Auth0ClientOptions } from '@auth0/auth0-spa-js';

type callbackFunction = {
  (): void;
};
export type Auth0ClientProps = {
  onRedirectCallback: callbackFunction;
} & Auth0ClientOptions;

const DEFAULT_REDIRECT_CALLBACK: callbackFunction = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<string | null>(null);

export const Auth0Provider: React.FC<Auth0ClientProps> = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
}) => {
  return <div>1</div>;
};

export default Auth0Provider;
