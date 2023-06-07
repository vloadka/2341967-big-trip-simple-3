import AbstractView from '../framework/view/abstract-view';

function createTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createTemplate();
  }
}
