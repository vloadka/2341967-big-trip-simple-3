import EditFormView from '../view/edit-form-view';
import { render, remove , replace } from '../framework/render';
import WaypointView from '../view/waypoint-view';
import { ACTION_TYPE , UpdateType} from '../utils/constants';
import dayjs from 'dayjs';

export default class WaypointPresenter {
  #waypointListComponent = null;
  #isEditing = false;
  #onFormOpen = null;
  #waypoint = null;
  #waypointView = null;
  #editPointView = null;
  #onWaypointChange = null;
  #destinations = null;
  #offers = null;
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
    const checkIsMinor = dayjs(this.#waypoint.dateFrom).isSame( newPoint.dateFrom, 'D') || this.#waypoint.basePrice !== newPoint.basePrice;

    this.#onWaypointChange(
      ACTION_TYPE.UPDATE_WAYPOINT,
      checkIsMinor ? UpdateType.MINOR : UpdateType.PATCH,
      newPoint,
    );

    this.#replaceToPointView();
    document.removeEventListener('keydown', this.#handleEscape);
  };

  #handleEscape = (e) => {
    if(e.key === 'Escape'){
      e.preventDefault();
      this.#editPointView.reset(this.#waypoint);
      this.#replaceToPointView();
      document.removeEventListener('keydown', this.#handleEscape);
    }
  };

  #handleDelete = (waypoint) => {
    this.#onWaypointChange(
      ACTION_TYPE.DELETE_WAYPOINT,
      UpdateType.MINOR,
      waypoint,
    );
  };

  destroy() {
    remove(this.#waypointView);
    remove(this.#editPointView);
  }

  resetView() {
    if (this.#isEditing) {
      this.#editPointView.reset(this.#waypoint);
      this.#replaceToPointView();
    }
  }

  rerender(point) {
    this.#waypoint = point;

    const oldWaypontView = this.#waypointView;
    const oldEditPointView = this.#editPointView;

    this.#waypointView = new WaypointView(point);
    this.#editPointView = new EditFormView({point, destinations: this.#destinations, offers: this.#offers, isEditForm: true});

    this.#editPointView.setSubmitHandler(this.#formSubmitHandler);

    this.#waypointView.setOpenHandler(() => {
      this.#onFormOpen();
      this.#replaceToEditPointView();
      document.addEventListener('keydown', this.#handleEscape);
    });
    this.#waypointView.setDeleteHandler(this.#handleDelete);
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

  init (point, destinations, offers) {
    this.#waypoint = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#waypointView = new WaypointView({point, destinations: this.#destinations,
      offers: this.#offers});

    this.#waypointView.setOpenHandler(() => {
      this.#onFormOpen();
      this.#replaceToEditPointView();
      document.addEventListener('keydown', this.#handleEscape);
    });

    this.#editPointView = new EditFormView({point, destinations: this.#destinations,
      offers: this.#offers, isEditForm: true});

    this.#editPointView.setSubmitHandler(this.#formSubmitHandler);
    this.#editPointView.setDeleteHandler(this.#handleDelete);

    this.#editPointView.setCloseHandler(() => {
      this.#editPointView.reset(this.#waypoint);
      this.#replaceToPointView();
      document.body.removeEventListener('keydown', this.#handleEscape);
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
