import Observable from '../framework/observable';

export default class WaypointModel extends Observable{

  #waypoints = [];
  constructor (waypoints) {
    super();
    this.#waypoints = waypoints;
  }

  get waypoints() {
    return this.#waypoints;
  }

  updateWaypoint(updateType, updatedPointInfo) {
    const index = this.#waypoints.findIndex((tripPoint) => tripPoint.id === updatedPointInfo.id);

    if (index === -1) {
      return;
    }

    this.#waypoints = this.#waypoints.slice(0, index).concat(updatedPointInfo, this.#waypoints.slice(index + 1));

    this._notify(updateType, updatedPointInfo);
  }

  addWaypoint(updateType, newPointInfo) {
    this.#waypoints = this.#waypoints.concat(newPointInfo);
    this._notify(updateType, newPointInfo);
  }

  deleteWaypoint(updateType, deletedPointInfo) {
    this.#waypoints = this.#waypoints.filter((el) => el.id !== deletedPointInfo.id);

    this._notify(updateType);
  }
}
