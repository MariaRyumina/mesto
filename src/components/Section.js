export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer; //отрисовка данных на страничке
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}