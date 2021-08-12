// import qs from 'query-string'

const getPopupPositionProperties = ({width = 600, height = 740} = {}) => {
  return Object.entries({
    left: window.screen.width / 2 - width / 2,
    top: window.screen.height / 2 - height / 2,
    width,
    height,
  })
    .map(([key, value]) => `${key}=${value}`)
    .join(',')
}

export class WindowPopup {
  close() {
    this.popup.close()
    this.popup = null
  }

  open({uri, from = 'OAUTH_REDIRECT', onSuccess, onFailure}) {
    this.uri = uri
    this.from = from
    this.onSuccess = onSuccess
    this.onFailure = onFailure

    if (this.popup) {
      return this.close()
    }

    const popup = window.open(this.uri, '_blank', getPopupPositionProperties())
    this.popup = popup

    window.removeEventListener('message', this.receiveMessage, false)
    window.addEventListener('message', this.receiveMessage, false)
  }

  receiveMessage = ({origin, data}) => {
    // const { state } = qs.parse(this.uri.split('?')[1]);

    if (origin === window.location.origin) {
      // Prevent CSRF attack by testing state
      // if (state && data.state !== state) {
      //     this.popup && this.popup.close();
      //     return;
      // }

      if (data.error && data.from === this.from) {
        this.onFailure(data)
      } else if (data.code && data.from === this.from) {
        this.onSuccess(data)
      }

      if (this.popup) {
        this.close()
      }
    }
  }
}

export const Popup = new WindowPopup()
