import React from 'react';
import { useEffect } from 'react';
import {
    handleRedirect as handleSocialRedirect,
    handleSocialLogin as useSocialLogin,
} from '../src';

const onSuccess = (response) => console.log(response);
const onFailure = (response) => console.error(response);

export function LoginCallback() {
    useEffect(() => {
        handleSocialRedirect();
    }, []);

    return null;
}

export function Login() {
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
