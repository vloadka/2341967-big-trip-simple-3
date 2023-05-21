import CreateFormView from '../view/form-creation-view';
import EditFormView from '../view/edit-form-view';
import SortingView from '../view/sorting-view';
import WaypointView from '../view/waypoint-view';
import WaypointList from '../view/waypoint-view-list';
import { render } from '../render';
import initialPoints from '../model/generate-trip-point-info';
export default class BoardPresenter {
  waypointListComponent = new WaypointList();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortingView(), this.boardContainer);
    render(this.waypointListComponent, this.boardContainer);
    render(new CreateFormView(), this.waypointListComponent.getElement());

    initialPoints.forEach((point) => {
      render(new WaypointView(point), this.waypointListComponent.getElement());
    });

    render(
      new EditFormView(initialPoints[0]),
      this.waypointListComponent.getElement()
    );
    // render(new EditFormView(), this.waypointListComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new WaypointView(), this.waypointListComponent.getElement());
    // }
  }
}
