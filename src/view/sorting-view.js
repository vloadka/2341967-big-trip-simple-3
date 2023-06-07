import AbstractView from '../framework/view/abstract-view.js';
import {sortingType} from '../utils/constants.js';


function createSortingTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${
    Object.keys(sortingType).map((type) => `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${type}" ${type === sortingType.day ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${type}">${type[0].toUpperCase() + type.slice(1)}</label>
      </div>
      `).join('')
    }
  </form>`
  );
}

export default class SortingView extends AbstractView {
  #currentType = sortingType.day;
  constructor() {
    super();
  }

  subscribeOnChange(callback) {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#changeHandler);
  }

  #changeHandler = (evt) => {
    evt.preventDefault();

    if(this.#currentType !== evt.target.value) {
      this._callback.change(evt.target.value);
      this.#currentType = evt.target.value;
    }
  };

  get template() {
    return createSortingTemplate();
  }
}
