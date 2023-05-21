//import CreateFormView from '../view/form-creation-view';
import EditFormView from '../view/edit-form-view';
import SortingView from '../view/sorting-view';
import WaypointView from '../view/waypoint-view';
import WaypointList from '../view/waypoint-view-list';
import EmptyMessageView from '../view/empty-message-view';
import { render } from '../render';

export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #boardContainer = null;
  #points = null;

  constructor({ boardContainer , points}) {
    this.#boardContainer = boardContainer;
    this.#points = points;
  }

  init() {
    if( this.#points.length === 0) {
      render(new EmptyMessageView(), this.#boardContainer);
    }
    else {
      render(new SortingView(), this.#boardContainer);
      render(this.#waypointListComponent, this.#boardContainer);
      // render(new CreateFormView(), this.waypointListComponent.element);
      this.#points.forEach((point) => {
        this.#createTripPoint(point);
      });
    }

    // render(
    //   new EditFormView(initialPoints[0]),
    //   this.#waypointListComponent.element
    // );
    // render(new EditFormView(), this.waypointListComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new WaypointView(), this.waypointListComponent.getElement());
    // }
  }

  #createTripPoint(point) {
    const tripPointView = new WaypointView(point);

    const editPointView = new EditFormView(point);

    const replaceToPointView = () => {
      this.#waypointListComponent.element.replaceChild(tripPointView.element, editPointView.element);
    };

    const replaceToEditPointView = () => {
      this.#waypointListComponent.element.replaceChild(editPointView.element, tripPointView.element);
    };
    const handleEscape = (e) => {
      if(e.key === 'Escape'){
        e.preventDefault();
        replaceToPointView();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    tripPointView.openButton.addEventListener('click', () => {
      replaceToEditPointView();
      document.addEventListener('keydown', handleEscape);
    });

    editPointView.submitButton.addEventListener('click', () => {
      replaceToPointView();
    });
    editPointView.closeButton.addEventListener('click', () => {
      replaceToPointView();
    });

    render(tripPointView, this.#waypointListComponent.element);
  }
}
