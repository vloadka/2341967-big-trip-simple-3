import { createElement } from '../render.js';

function createEmptyMessageTemplate(
) {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyMessageView {
  #element = null;
  #getTemplate() {
    return createEmptyMessageTemplate(
    );
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
