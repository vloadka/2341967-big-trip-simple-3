import AbstractView from '../framework/view/abstract-view.js';


function createWaypointListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}
export default class WaypointList extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createWaypointListTemplate();
  }
}
