import Observable from '../framework/observable';

export default class OfferModel extends Observable {
  #offers = [];
  #api = null;
  constructor (api) {
    super();
    this.#api = api;

    this.init();
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#api.offers;
    } catch(err) {
      this.#offers = [];
    }
  }
}
