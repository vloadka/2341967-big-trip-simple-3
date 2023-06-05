import SortingView from '../view/sorting-view';

import WaypointList from '../view/waypoint-view-list';
import EmptyMessageView from '../view/empty-message-view';
import { render } from '../framework/render';
import WaypointPresenter from './waypoint-presenter';

export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #boardContainer = null;
  #points = null;
  #tripPointPresentersAll = {};

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
        const presenter = new WaypointPresenter(this.#waypointListComponent.element, () => {
          this.#closeAllForms();
        });

        presenter.init(point);

        this.#tripPointPresentersAll[point.id] = presenter;
      });

    }
  }

  #closeAllForms() {
    Object.values(this.#tripPointPresentersAll).forEach((presenter) => {
      presenter.closeForm();
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


  // #createTripPoint(point) {
  //   const tripPointView = new WaypointView(point);

  //   const editPointView = new EditFormView(point);

  //   const replaceToPointView = () => {
  //     this.#waypointListComponent.element.replaceChild(tripPointView.element, editPointView.element);
  //   };

  //   const replaceToEditPointView = () => {
  //     this.#waypointListComponent.element.replaceChild(editPointView.element, tripPointView.element);
  //   };
  //   const handleEscape = (e) => {
  //     if(e.key === 'Escape'){
  //       e.preventDefault();
  //       replaceToPointView();
  //       document.removeEventListener('keydown', handleEscape);
  //     }
  //   };

  //   tripPointView.setOpenHandler(() => {
  //     replaceToEditPointView();
  //     document.addEventListener('keydown', handleEscape);
  //   });

  //   editPointView.setSubmitHandler(() => {
  //     replaceToPointView
  //   });
  //   editPointView.setCloseHandler(() => {
  //     replaceToPointView();
  //   });

  //   render(tripPointView, this.#waypointListComponent.element);
  // }
}
