import AbstractView from '../framework/view/abstract-view.js';


export function formatDateToHHMM(props) {
  const date = new Date(props);
  const hours = date.getHours().toString().padStart(2, '0'); // получаем часы и форматируем строку
  const minutes = date.getMinutes().toString().padStart(2, '0'); // получаем минуты и форматируем строку
  return `${hours}:${minutes}`;
}

export function formatDateToMMDD(props) {
  const date = new Date(props);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // получаем часы и форматируем строку
  const day = date.getDate().toString().padStart(2, '0'); // получаем минуты и форматируем строку
  return `${month}.${day}`;
}

function renderOffers(offersALL, selectedOffers, type) {
  const aviableOffers = offersALL.find((el) => el.type === type).offers;
  return aviableOffers.filter((el) => selectedOffers.find((off) => off.id === el.id)).map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join('');
}

function createWaypointTemplate(
  waypoint,
  destinations,
  offers,
) {
  const destination = destinations.find((el) => el.id === waypoint.destination.id);
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${waypoint.dateFrom}">${formatDateToMMDD(
  waypoint.dateFrom
)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${waypoint.type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${waypoint.dateTo}">${formatDateToHHMM(
  waypoint.dateFrom
)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${formatDateToHHMM(
    waypoint.dateTo
  )}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${waypoint.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${renderOffers(offers, waypoint.offers, waypoint.type)}

      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class WaypointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;

  constructor({
    point,
    destinations,
    offers
  }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  setOpenHandler(callback) {
    this._callback.open = callback;
    this.openButton.addEventListener('click', this.#openHandler);
  }

  #openHandler = (e) => {
    e.preventDefault();
    this._callback.open();
  };

  get template() {
    return createWaypointTemplate(
      this.#point, this.#destinations, this.#offers
    );
  }

  get openButton() {
    return this.element.querySelector('.event__rollup-btn');
  }
}


