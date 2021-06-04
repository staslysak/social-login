# Social Login

Not at npm registry yet

## Supported providers

`GitHub`

`LinkedIn`

`Google`

`Facebook`

## Usage

```js
import React, { useEffect } from 'react';
import { render } from 'react-dom';

import {
    handleRedirect as handleSocialRedirect,
    handleSocialLogin as useSocialLogin,
} from '../src';

const onSuccess = (response) => console.log(response);
const onFailure = (response) => console.error(response);

export function App() {
    useEffect(() => {
        handleSocialRedirect();
    }, []);

    const handleGithub = useSocialLogin({
        provider: 'github',
        clientId: 'YOUR_GITHUB_CLIENT_ID',
        onSuccess,
        onFailure,
    });

    const handleLinkedin = useSocialLogin({
        provider: 'linkedin',
        clientId: 'YOUR_LINKEDIN_CLIENT_ID',
        redirectUri: window.location.origin,
        onSuccess,
        onFailure,
    });

    const handleGoogle = useSocialLogin({
        provider: 'google',
        clientId: 'YOUR_GOOGLE_CLIENT_ID',
        redirectUri: window.location.origin,
        onSuccess,
        onFailure,
    });

    const handleFacebook = useSocialLogin({
        provider: 'facebook',
        clientId: 'YOUR_FACEBOOK_CLIENT_ID',
        redirectUri: window.location.origin,
        onSuccess,
        onFailure,
    });

    return (
        <>
            <button onClick={handleGithub}>Sign in with GitHub</button>
            <button onClick={handleLinkedin}>Sign in with LinkedIn</button>
            <button onClick={handleGoogle}>Sign in with Google</button>
            <button onClick={handleFacebook}>Sign in with Facebook</button>
        </>
    );
}

render(<App />, document.getElementById('example'));
```

### Props

#### `clientId`

`{string}` _required_

Client ID for GitHub OAuth application.

#### `redirectUri`

`{string}`

Registered redirect URI for GitHub OAuth application.

#### `scope`

`{string}`

Scope for GitHub OAuth application. Defaults to `user:email`.

#### `className`

`{string}`

CSS class for the login button.

#### `childern`

`{node}`

Content for the login button.

#### `onRequest`

`{function}`

Callback for every request.

#### `onSuccess`

`{function}`

Callback for successful login. An object will be passed as an argument to the callback, e.g. `{ "code": "..." }`.

#### `onFailure`

`{function}`

Callback for errors raised during login.

## Development

```sh
$ npm start
```

## Useful links

[GitHub login](https://developer.github.com/v3/oauth/)

[LinkedIn login](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=https)

[Facebook login](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/)

[Google login](https://developers.google.com/identity/protocols/oauth2/web-server)

### Social login flow

## LinkedIn login flow

-   Get code

-   Exchage code for token

POST https://www.linkedin.com/oauth/v2/accessToken

Params:

`{client_id}`
`{client_secret}`
`{code}`
`{redirect_uri}`
`{grant_type}` = authorization_code

-   Get profile

GET https://api.linkedin.com/v2/me

Headers:

`{Authorization}` = Bearer `{access_token}`

## Facebook login flow

-   Get code

-   Exchage code for token

GET https://graph.facebook.com/v10.0/oauth/access_token

Params:

`{client_id}`
`{client_secret}`
`{code}`
`{redirect_uri}`

-   Get profile

GET https://graph.facebook.com/me

Params:

`{fields}` = id,name,email,picture.type(large)
`{access_token}`

## Google login flow

-   Get code

-   Exchage code for token

POST https://oauth2.googleapis.com/token

Params:

`{client_id}`
`{client_secret}`
`{code}`
`{redirect_uri}`
`{grant_type}` = authorization_code

-   Get profile

GET https://www.googleapis.com/oauth2/v1/userinfo

Params:

`{alt}` = json
`{access_token}`
