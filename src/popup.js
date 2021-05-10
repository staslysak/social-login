import qs from 'query-string';

const getPopupPositionProperties = ({ width = 600, height = 740 } = {}) => {
    return Object.entries({
        left: window.screen.width / 2 - width / 2,
        top: window.screen.height / 2 - height / 2,
        width,
        height,
    })
        .map(([key, value]) => `${key}=${value}`)
        .join(',');
};

export class Popup {
    constructor({ uri, from = 'OAUTH_REDIRECT', onSuccess, onFailure }) {
        this.uri = uri;
        this.from = from;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
    }

    static open(...args) {
        const popup = new this(...args);
        popup.open();

        return popup;
    }

    open() {
        window.removeEventListener('message', this.receiveMessage, false);
        if (this.popup) this.popup.close();

        this.popup = window.open(
            this.uri,
            '_blank',
            getPopupPositionProperties()
        );

        window.addEventListener('message', this.receiveMessage, false);
    }

    receiveMessage = (event) => {
        const { origin, data } = event;
        const { state } = qs.parse(this.uri.split('?')[1]);

        if (origin === window.location.origin) {
            // Prevent CSRF attack by testing state
            if (state && data.state !== state) {
                this.popup && this.popup.close();
                return;
            }

            if (data.errorMessage && data.from === this.from) {
                this.onFailure(event.data);
            } else if (data.code && data.from === this.from) {
                this.onSuccess({ code: event.data.code });
            }

            this.popup && this.popup.close();
        }
    };
}
