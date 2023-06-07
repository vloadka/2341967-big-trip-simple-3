import AbstractView from '../framework/view/abstract-view.js';

function renderOneFilterTemplate(filter, selectedFilter) {
  return `
  <div class="trip-filters__filter">
      <input
      id="filter-${filter}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter}"
      ${filter.toLowerCase() === selectedFilter.toLowerCase() ? 'checked' : ''}>
      <label class="trip-filters__filter-label"
      for="filter-${filter}">${filter}</label>
  </div>
  `;
}

function createFiltersTemplate(allFilters, selectedFilter) {

  return (`
  <form class="trip-filters" action="#" method="get">
    ${allFilters
      .map((filter) => renderOneFilterTemplate(filter, selectedFilter))
      .join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
}

export default class FiltersView extends AbstractView{
  #filters = null;
  #selectedFilter = null;

  constructor(filters, selectedFilter, onChange) {
    super();
    this.#filters = filters;
    this.#selectedFilter = selectedFilter;
    this._callback.onChange = onChange;

    this.element.addEventListener('change', this.#filtersChangeHandler);

  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#selectedFilter);
  }

  #filtersChangeHandler = (e) => {
    e.preventDefault();
    this._callback.onChange(e.target.value);
  };
}

