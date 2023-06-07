import AbstractView from '../framework/view/abstract-view.js';


export function formatDateToHHMM(date) {
  const hours = date.getHours().toString().padStart(2, '0'); // получаем часы и форматируем строку
  const minutes = date.getMinutes().toString().padStart(2, '0'); // получаем минуты и форматируем строку
  return `${hours}:${minutes}`;
}

export function formatDateToMMDD(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // получаем часы и форматируем строку
  const day = date.getDate().toString().padStart(2, '0'); // получаем минуты и форматируем строку
  return `${month}.${day}`;
}

function createWaypointTemplate(
  basePrice,
  dateFrom,
  dateTo,
  destination,
  id,
  offers,
  type
) {
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom.toISOString()}">${formatDateToMMDD(
  dateFrom
)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${formatDateToHHMM(
    dateFrom
  )}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${formatDateToHHMM(
    dateTo
  )}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offers
    .map(
      (offer) => `
          <li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>
          `
    )
    .join('')}
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">20</span>
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class WaypointView extends AbstractView {
  #basePrice = null;
  #dateFrom = null;
  #dateTo = null;
  #destination = null;
  #id = null;
  #offers = null;
  #type = null;

  constructor({
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    offers,
    type,
  }) {
    super();
    this.#basePrice = basePrice;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
    this.#destination = destination;
    this.#id = id;
    this.#offers = offers;
    this.#type = type;
  }

  setOpenHandler(callback) {
    this._callback.open = callback;
    this.openButton.addEventListener('click', this.#openHandler);
  }

  #openHandler = (evt) => {
    evt.preventDefault();
    this._callback.open();
  };

  get template() {
    return createWaypointTemplate(
      this.#basePrice,
      this.#dateFrom,
      this.#dateTo,
      this.#destination,
      this.#id,
      this.#offers,
      this.#type
    );
  }

  get openButton() {
    return this.element.querySelector('.event__rollup-btn');
  }
}
