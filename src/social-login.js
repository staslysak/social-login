import qs from 'query-string'

import {Popup} from './popup'
import {getSocialUri} from './oauth-uri'

export const handleRedirect = (from = 'OAUTH_REDIRECT') => {
  const {
    code,
    state,
    error,
    errorMessage = 'Login failed. Please try again.',
  } = qs.parse(window.location.search)

  // Close tab if user cancelled login
  if (error === 'user_cancelled_login') {
    window.close()
    return
  }

  if (window.opener && (error || code)) {
    const message = {
      from,
      state,
      ...(error
        ? {
            error,
            errorMessage,
          }
        : {
            code,
          }),
    }

    window.opener.postMessage(message, window.location.origin)
  }
}

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
    })

    Popup.open({
      uri,
      onSuccess,
      onFailure,
    })
  }

  return handleLogin
}
