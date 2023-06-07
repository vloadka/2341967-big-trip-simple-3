import Observable from '../framework/observable';

export default class DestinationModel extends Observable {
  #destinations = [];

  constructor (destinations) {
    super();
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
