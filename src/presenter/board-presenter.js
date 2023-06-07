
import SortingView from '../view/sorting-view';
import WaypointList from '../view/waypoint-view-list';
import EmptyMessageView from '../view/empty-message-view';
import { render, RenderPosition, remove } from '../framework/render';
import WaypointPresenter from './waypoint-presenter';
import {sortingType, UpdateType, FilterType, ACTION_TYPE} from '../utils/constants.js';
import {filter, sort} from '../utils/functions.js';
import FormCreationPresenter from './form-creation-presenter';

export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #boardContainer = null;
  #points = null;
  #tripPointPresentersAll = {};
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;
  #waypointModel = null;
  #currentFilter = null;
  #currentSort = sortingType.day;
  #sortComponent = null;
  #formCreatePresenter = null;

  #emptyMessageComponent = null;


  constructor({ boardContainer , waypointModel, destinationModel, offerModel, filterModel, handleFormCreationDestroy}) {
    this.#boardContainer = boardContainer;

    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#waypointModel = waypointModel;


    this.#formCreatePresenter = new FormCreationPresenter({
      waypointListContainer: this.#waypointListComponent.element,
      handleInfoChange: this.#handleAction,
      handleDestroy: handleFormCreationDestroy
    });

    this.#waypointModel.addObserver(this.#handleModelUpdate);
    this.#filterModel.addObserver(this.#handleModelUpdate);
  }


  get waypoints() {
    this.#currentFilter = this.#filterModel.filter;
    const waypoints = this.#waypointModel.waypoints;
    return filter( this.#currentFilter, waypoints).sort(sort(this.#currentSort));
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offerModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createWaypoint() {
    this.#currentSort = sortingType.day;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#formCreatePresenter.init(this.destinations, this.offers);
  }

  #handleAction = (action, updateType, updatedInfo) => {
    switch (action) {
      case ACTION_TYPE.ADD_WAYPOINT:
        this.#waypointModel.addWaypoint(updateType, updatedInfo);
        break;
      case ACTION_TYPE.UPDATE_WAYPOINT:
        this.#waypointModel.updateWaypoint(updateType, updatedInfo);
        break;
      case ACTION_TYPE.DELETE_WAYPOINT:
        this.#waypointModel.deleteWaypoint(updateType, updatedInfo);
        break;
    }
  };

  #handleModelUpdate = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresentersAll[data.id].rerender(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };


  #renderEmptyMessageView() {
    this.#emptyMessageComponent = new EmptyMessageView();
    render(this.#emptyMessageComponent, this.#boardContainer);
  }

  #handleEditFormOpen = () => {
    this.#formCreatePresenter.destroy();
    Object.values(this.#tripPointPresentersAll).forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortingView(this.#currentSort);
    this.#sortComponent.subscribeOnChange(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderWaypoint(waypoint) {
    const presenter = new WaypointPresenter(
      this.#waypointListComponent.element,
      this.#handleEditFormOpen,
      this.#handleAction
    );

    presenter.init(waypoint, this.destinations, this.offers);
    this.#tripPointPresentersAll[waypoint.id] = presenter;
  }


  #clearBoard = ({resetSortType = false} = {}) => {
    this.#formCreatePresenter.destroy();
    Object.values(this.#tripPointPresentersAll).forEach((presenter) => presenter.destroy());
    this.#tripPointPresentersAll = {};

    remove(this.#sortComponent);

    if(this.#emptyMessageComponent) {
      remove(this.#emptyMessageComponent);
    }

    if (resetSortType) {
      this.#currentSort = sortingType.day;
    }
  };

  #renderBoard() {
    const waypoints = this.waypoints;
    if (waypoints.length === 0) {
      this.#renderEmptyMessageView();
      return;
    }
    this.#renderSort();

    render(this.#waypointListComponent, this.#boardContainer);

    this.#renderWaypoints(waypoints);

  }

  #renderWaypoints(list) {

    list.forEach((point) => this.#renderWaypoint(point));

  }

}
