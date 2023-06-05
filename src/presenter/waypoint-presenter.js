import EditFormView from '../view/edit-form-view';
import { render } from '../framework/render';
import WaypointView from '../view/waypoint-view';

export default class WaypointPresenter {
  #waypointListComponent = null;
  #isEditing = false;
  #onFormOpen = null;
  #waypoint = null;
  #waypointView = null;
  #editPointView = null;

  constructor(waypointListComponent, onFormOpen) {
    this.#waypointListComponent = waypointListComponent;
    this.#isEditing = false;

    this.#onFormOpen = onFormOpen;
  }

  #replaceToPointView () {
    this.#isEditing = false;
    this.#waypointListComponent.replaceChild(this.#waypointView.element, this.#editPointView.element);
  }

  #replaceToEditPointView () {
    this.#isEditing = true;
    this.#waypointListComponent.replaceChild(this.#editPointView.element, this.#waypointView.element);
  }

  init (point) {
    this.#waypoint = point;

    this.#waypointView = new WaypointView(point);

    this.#editPointView = new EditFormView(point);

    const handleEscape = (e) => {
      if(e.key === 'Escape'){
        e.preventDefault();
        this.#replaceToPointView();
        document.removeEventListener('keydown', handleEscape);
      }
    };

    this.#waypointView.setOpenHandler(() => {
      this.#onFormOpen();
      this.#replaceToEditPointView();
      document.addEventListener('keydown', handleEscape);
    });

    this.#editPointView.setSubmitHandler(() => {
      this.#replaceToPointView();
    });
    this.#editPointView.setCloseHandler(() => {
      this.#replaceToPointView();
    });

    render(this.#waypointView, this.#waypointListComponent);

  }

  closeForm() {
    if(this.#isEditing) {this.#replaceToPointView();}
  }
}
