import AbstractView from '../framework/view/abstract-view.js';
import {sortingType} from '../utils/constants.js';


function createSortingTemplate(currentType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${
    Object.keys(sortingType).map((type) => `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${type}" ${type === currentType ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${type}">${type[0].toUpperCase() + type.slice(1)}</label>
      </div>
      `).join('')
    }
  </form>`
  );
}

export default class SortingView extends AbstractView {
  #currentType = sortingType.day;
  constructor(sortType) {
    super();
    this.#currentType = sortType;
  }

  subscribeOnChange(callback) {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#changeHandler);
    // Arary.from(this.#buttons).forEach(el => el.addEventListener('click', this.#changeHandler));
  }

  #changeHandler = (e) => {
    e.preventDefault();

    if(this.#currentType !== e.target.value) {
      this._callback.change(e.target.value);
      this.#currentType = e.target.value;
    }
  };

  get template() {
    return createSortingTemplate(this.#currentType);
  }
}
