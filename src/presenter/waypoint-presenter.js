import EditFormView from '../view/edit-form-view';
import { render, remove , replace } from '../framework/render';
import WaypointView from '../view/waypoint-view';

export default class WaypointPresenter {
  #waypointListComponent = null;
  #isEditing = false;
  #onFormOpen = null;
  #waypoint = null;
  #waypointView = null;
  #editPointView = null;
  #onWaypointChange = null;

  constructor(waypointListComponent, onFormOpen, onWaypointChange) {
    this.#waypointListComponent = waypointListComponent;
    this.#isEditing = false;
    this.#onWaypointChange = onWaypointChange;
    this.#onFormOpen = onFormOpen;
  }

  #replaceToPointView () {
    replace(this.#waypointView, this.#editPointView);
    this.#isEditing = false;
  }

  #replaceToEditPointView () {
    this.#isEditing = true;
    replace(this.#editPointView, this.#waypointView);
  }

  #formSubmitHandler = (newPoint) => {
    this.#onWaypointChange(newPoint);
    this.#replaceToPointView();
    document.removeEventListener('keydown', this.#handleEscape);
  };

  #handleEscape = (e) => {
    if(e.key === 'Escape'){
      e.preventDefault();
      this.#replaceToPointView();
      document.removeEventListener('keydown', this.#handleEscape);
    }
  };

  rerender(point) {
    this.#waypoint = point;

    const oldWaypontView = this.#waypointView;
    const oldEditPointView = this.#editPointView;


    this.#waypointView = new WaypointView(point);

    this.#editPointView = new EditFormView(point);

    this.#editPointView.setSubmitHandler(this.#formSubmitHandler);

    this.#waypointView.setOpenHandler(() => {
      this.#onFormOpen();
      this.#replaceToEditPointView();
      document.addEventListener('keydown', this.#handleEscape);
    });

    if (oldWaypontView === null || oldEditPointView === null) {
      render(this.#waypointView, this.#waypointListComponent);
      return;
    }

    if(this.#isEditing) {
      replace(this.#editPointView, oldEditPointView);
    } else {
      replace(this.#waypointView, oldWaypontView);
    }

    remove(oldEditPointView);
    remove(oldWaypontView);
  }

  init (point) {
    this.#waypoint = point;

    this.#waypointView = new WaypointView(point);

    this.#editPointView = new EditFormView(point);
    this.#editPointView.setSubmitHandler(this.#formSubmitHandler);

    this.#waypointView.setOpenHandler(() => {
      this.#onFormOpen();
      this.#replaceToEditPointView();
      document.addEventListener('keydown', this.#handleEscape);
    });


    this.#editPointView.setCloseHandler(() => {
      this.#replaceToPointView();
    });

    render(this.#waypointView, this.#waypointListComponent);
  }

  closeForm() {
    if(this.#isEditing) {this.#replaceToPointView();}
  }

  removePoint() {
    remove(this.#waypointView);
    remove(this.#editPointView);
  }
}
