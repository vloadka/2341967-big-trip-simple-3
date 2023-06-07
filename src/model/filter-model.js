import Observable from '../framework/observable.js';
import {FilterType} from '../utils/constants.js';


export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  constructor() {
    super();
  }

  get filter() {
    return this.#filter;
  }

  get ALLfilters() {
    return Object.keys(FilterType);
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
