import qs from 'query-string';

const getFacebookUri = ({ scope, clientId, redirectUri, state }) => {
    const baseUri = 'https://www.facebook.com/v10.0/dialog/oauth';
    const search = qs.stringify({
        client_id: clientId,
        scope: scope || 'public_profile,email',
        redirect_uri: redirectUri || '',
        state,
    });

    return `${baseUri}?${search}`;
};

const getGithubUri = ({ scope, clientId, redirectUri, state }) => {
    const baseUri = 'https://github.com/login/oauth/authorize';
    const search = qs.stringify({
        client_id: clientId,
        scope: scope || 'user:email',
        redirect_uri: redirectUri || '',
        state,
    });

    return `${baseUri}?${search}`;
};

const getGoogleUri = ({ scope, clientId, redirectUri, state }) => {
    const baseUri = 'https://accounts.google.com/o/oauth2/v2/auth';
    const search = qs.stringify({
        include_granted_scopes: true,
        response_type: 'code',
        access_type: 'offline',
        client_id: clientId,
        scope: `https://www.googleapis.com/auth/${scope || 'userinfo.profile'}`,
        redirect_uri: redirectUri || '',
        state,
    });

    return `${baseUri}?${search}`;
};

const getLinkedInUri = ({ scope, clientId, redirectUri, state }) => {
    const baseUri = 'https://www.linkedin.com/oauth/v2/authorization';
    const search = qs.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: encodeURI(scope || 'r_liteprofile'),
        redirect_uri: redirectUri || '',
        state,
    });

    return `${baseUri}?${search}`;
};

const providers = {
    github: getGithubUri,
    google: getGoogleUri,
    facebook: getFacebookUri,
    linkedin: getLinkedInUri,
};

export const getSocialUri = ({ provider, ...props }) =>
    providers[provider](props);
