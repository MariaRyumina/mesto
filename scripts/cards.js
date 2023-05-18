function addCard (name, link) {
    const templateElements = document.querySelector('#elements').content;
    const card = templateElements.querySelector('.element').cloneNode(true);

    card.querySelector('.element__img').textContent = link;
    card.querySelector('.element__title').textContent = name;

    initialCards.prepend(card);
}

buttonAdd.addEventListener('click', function () {
    const name = document.querySelector('.popup__input_value_title');
    const link = document.querySelector('.popup__input_value_link');

    addCard(name.value, link.value);
});
