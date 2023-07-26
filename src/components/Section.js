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

    addItemEnd(element) {
        this._container.append(element);
    }

    addItemStart(element) {
        this._container.prepend(element);
    }

    deleteItem(element) {
        element.remove();
        element = null;
    }
}