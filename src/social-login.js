import qs from 'query-string';

import { Popup } from './popup';
import { getSocialUri } from './oauth-uri';

export const handleRedirect = (from = 'OAUTH_REDIRECT') => {
    const {
        error,
        errorMessage = 'Login failed. Please try again.',
        state,
        code,
    } = qs.parse(window.location.search);

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
        const uri = getSocialUri({
            provider,
            scope,
            clientId,
            redirectUri,
            state: state || 'STATE',
        });

        Popup.open({
            uri,
            onSuccess,
            onFailure,
        });
    };

    return handleLogin;
};
