export class Popup {
    constructor(selector) {
        this._container = selector;
    }

    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this.setEventListeners()
    }

    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    //закрытие попапа на Escape
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        //закрытие попапа на "X"
        this._container.querySelector('.popup__close').addEventListener('click', () => {
            this.close()
        })

        //закрытие попапа на overlay
        this._container.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })
    }
}