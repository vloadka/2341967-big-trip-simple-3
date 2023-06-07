import AbstractView from '../framework/view/abstract-view.js';


function createNewTripPointButtonTemplate() {
  return ' <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;

  constructor(handleClick) {
    super();
    this.#handleClick = handleClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewTripPointButtonTemplate();
  }

  #clickHandler = (e) => {
    e.preventDefault();
    this.#handleClick();
  };
}
