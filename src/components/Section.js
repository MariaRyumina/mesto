export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer; //отрисовка данных на страничке
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItemEnd(element) {
        this._container.append(element);
    }

    addItemStart(element) {
        this._container.prepend(element);
    }
}