import qs from 'query-string';

import { Popup } from './popup';
import { getSocialUri } from './oauth-uri';

export const handleRedirect = (from = 'OAUTH_REDIRECT') => {
    const {
        error,
        errorMessage = 'Login failed. Please try again.',
        state,
        code,
        linkedin_redirect_url,
    } = qs.parse(window.location.search);

    if (state && state.includes('native')) {
        const [, nativeAppUri] = state.split('-'); //'exp://login'
        window.location.href = nativeAppUri + window.location.search;
        return;
    }

    if (error || code) {
        if (window.opener) {
            window.opener.postMessage(
                {
                    ...(error
                        ? {
                              state,
                              error,
                              errorMessage,
                          }
                        : {
                              state,
                              code,
                          }),
                    from,
                },
                window.location.origin
            );
        }

        // Close tab if user cancelled login
        if (error === 'user_cancelled_login') {
            window.close();
        }
    }

    if (linkedin_redirect_url) {
        window.location.href = linkedin_redirect_url;
    }
};

export const handleSocialLogin = ({
    provider,

    scope,
    clientId,
    redirectUri,
    state,

    onSuccess = () => {},
    onFailure = () => {},
}) => {
    const handleLogin = () => {
        Popup.open({
            uri: getSocialUri({
                provider,
                scope,
                clientId,
                redirectUri,
                state: state || Math.random().toString(32),
            }),
            onSuccess,
            onFailure,
        });
    };

    return handleLogin;
};
