import React from "react";
import createAuth0Client, { Auth0ClientOptions } from '@auth0/auth0-spa-js';

export type Auth0ClientProps = { onRedirectCallback: () => void } & Auth0ClientOptions
export const Auth0Provider: React.FC<Auth0ClientProps> = ({ onRedirectCallback }) => {
  return (
    <div>1</div>
  )
};

export default Auth0Provider;