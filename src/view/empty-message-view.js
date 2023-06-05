import AbstractView from '../framework/view/abstract-view.js';


function createEmptyMessageTemplate(
) {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyMessageView extends AbstractView {
  constructor() {
    super();
  }


  get template() {
    return createEmptyMessageTemplate();
  }

}
