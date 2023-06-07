import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filters-view.js';
import {UpdateType} from '../utils/constants.js';

export default class FilterPresenter {
  #DOMelement = null;
  #filterModel = null;
  #waypointModel = null;
  #filterComponent = null;

  constructor(DOMelement, filterModel, waypointModel) {
    this.#DOMelement = DOMelement;
    this.#filterModel = filterModel;
    this.#waypointModel = waypointModel;

    this.#waypointModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    return this.#filterModel.ALLfilters;
  }

  rerender() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(
      filters,
      this.#filterModel.filter,
      this.#handleFilterChange
    );

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#DOMelement);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  init() {
    const filters = this.filters;

    this.#filterComponent = new FilterView(
      filters,
      this.#filterModel.filter,
      this.#handleFilterChange
    );

    render(this.#filterComponent, this.#DOMelement);
  }

  #handleModelChange = () => {
    this.rerender();
  };

  #handleFilterChange = (newFilter) => {
    if (this.#filterModel.filter === newFilter) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, newFilter);
  };
}
