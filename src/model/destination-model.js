import Observable from '../framework/observable';

export default class DestinationModel extends Observable {
  #destinations = [];
  #api = null;
  constructor (api) {
    super();
    this.#api = api;

    this.init();
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#api.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
