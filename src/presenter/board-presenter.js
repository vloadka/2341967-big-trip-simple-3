import SortingView from '../view/sorting-view';

import WaypointList from '../view/waypoint-view-list';
import EmptyMessageView from '../view/empty-message-view';
import { render } from '../framework/render';
import WaypointPresenter from './waypoint-presenter';
import {sortingType} from '../utils/constants.js';

export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #boardContainer = null;
  #points = null;
  #tripPointPresentersAll = {};
  #sortType = sortingType.day;

  constructor({ boardContainer , points}) {
    this.#boardContainer = boardContainer;
    this.#points = points;
  }

  #sortWaypoints(sort) {
    this.#sortType = sort;
    switch (sort) {
      case sortingType.day:
        this.#points = this.#points.sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
        break;
      case sortingType.price:
        this.#points = this.#points.sort((a, b) => a.basePrice - b.basePrice);
        break;

      default:
        break;
    }
  }


  #handleWaypointChange = (newInfo) => {
    this.#points = this.#points.map((point) => point.id === newInfo.id ? newInfo : point);
    this.#tripPointPresentersAll[newInfo.id].rerender(newInfo);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortWaypoints(sortType);

    this.#clearTripPointList();
    this.#renderTripPointsList();
  };

  #clearTripPointList() {
    Object.values(this.#tripPointPresentersAll).forEach((presenter) => {
      presenter.removePoint();
    });
  }

  #renderTripPointsList() {

    this.#points.forEach((point) => {
      const presenter = new WaypointPresenter(
        this.#waypointListComponent.element,
        () => {
          this.#closeAllForms();
        },
        (data) => this.#handleWaypointChange(data)
      );

      presenter.init(point);
      this.#tripPointPresentersAll[point.id] = presenter;
    });
  }

  init() {
    if( this.#points.length === 0) {
      render(new EmptyMessageView(), this.#boardContainer);
    }
    else {
      const sort = new SortingView();
      render(sort, this.#boardContainer);

      sort.subscribeOnChange((newSort) => {

        // ! sort trip points

        this.#handleSortTypeChange(newSort);

      });
      render(this.#waypointListComponent, this.#boardContainer);

      this.#points.forEach((point) => {
        const presenter = new WaypointPresenter(this.#waypointListComponent.element, () => {
          this.#closeAllForms();
        },this.#handleWaypointChange
        );

        presenter.init(point);

        this.#tripPointPresentersAll[point.id] = presenter;
      });
      this.#handleSortTypeChange(sortingType.day);
    }
  }

  #closeAllForms() {
    Object.values(this.#tripPointPresentersAll).forEach((presenter) => {
      presenter.closeForm();
    });
  }
}

