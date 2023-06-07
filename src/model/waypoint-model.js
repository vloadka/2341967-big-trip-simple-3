export default class WaypointModel {
  #ALLwaypoints = null;
  #ALLdestinations = null;
  #ALLoffers = null;

  constructor (waypoints, destinations, offers) {
    this.#ALLwaypoints = waypoints;
    this.#ALLdestinations = destinations;
    this.#ALLoffers = offers;
  }

  get ALLwaypoints() {
    return this.#ALLwaypoints;
  }


  get ALLdestinations() {
    return this.#ALLdestinations;
  }

  get ALLoffers() {
    return this.#ALLoffers;
  }

}
