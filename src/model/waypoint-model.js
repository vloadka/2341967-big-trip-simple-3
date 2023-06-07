import Observable from '../framework/observable';
import {UpdateType} from '../utils/constants';

export default class WaypointModel extends Observable{
  #api = null;
  #waypoints = [];

  constructor (api) {
    super();
    this.#api = api;

    this.init();
  }

  get waypoints() {
    return this.#waypoints;
  }

  async init() {
    try {
      const waypoints = await this.#api.waypoints;
      this.#waypoints = waypoints.map(this.#adaptToClient);
    } catch(err) {
      this.#waypoints = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateWaypoint(updateType, updatedPointInfo) {
    const index = this.#waypoints.findIndex((tripPoint) => tripPoint.id === updatedPointInfo.id);

    if (index === -1) {
      return;
    }

    try {
      const response = await this.#api.updateWaypoint(updatedPointInfo);
      const updatedPoint = this.#adaptToClient(response);
      this.#waypoints = [
        ...this.waypoints.slice(0, index),
        updatedPoint,
        ...this.#waypoints.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('error while updating waypoint');
    }

    this._notify(updateType, updatedPointInfo);
  }

  async addWaypoint(updateType, newPointInfo) {
    this.#waypoints = this.#waypoints.concat(newPointInfo);
    this._notify(updateType, newPointInfo);

    try {
      const response = await this.#api.addWaypoint(newPointInfo);
      const newPoint = this.#adaptToClient(response);
      this.#waypoints = [newPoint, ...this.#waypoints];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('error while adding waypoint');
    }
  }

  async deleteWaypoint(updateType, deletedPointInfo) {
    this._notify(updateType);

    try {
      await this.#api.deleteWaypoint(deletedPointInfo);
      this.#waypoints = this.#waypoints.filter((point) => point.id !== deletedPointInfo.id);
      this._notify(updateType);
    } catch(err) {
      throw new Error('error while deleting waypoint');
    }
  }


  #adaptToClient(tripPoint) {
    const adaptedTripPoint = {...tripPoint,
      dateFrom: tripPoint['date_from'],
      dateTo: tripPoint['date_to'],
      offers: tripPoint['offers'] || [],
      basePrice: tripPoint['base_price'],
    };

    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['base_price'];
    return adaptedTripPoint;
  }
}

