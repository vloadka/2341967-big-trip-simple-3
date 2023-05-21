import {createElement} from '../render.js';

export function formatDateToHHMM(date) {
  const hours = date.getHours().toString().padStart(2, '0'); // получаем часы и форматируем строку
  const minutes = date.getMinutes().toString().padStart(2, '0'); // получаем минуты и форматируем строку
  return `${hours}:${minutes}`;
}

export function formatDateToMMDD(date) {
  const month = date.getMonth().toString().padStart(2, '0'); // получаем часы и форматируем строку
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
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${formatDateToMMDD(
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
        (offer) =>`
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
        `
      )
      .join('')}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class WaypointView {

  constructor({
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    offers,
    type,
  }) {
    this.basePrice = basePrice;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.destination = destination;
    this.id = id;
    this.offers = offers;
    this.type = type;
  }

  getTemplate() {
    return createWaypointTemplate(
      this.base_price,
      this.date_from,
      this.date_to,
      this.destination,
      this.id,
      this.offers,
      this.type
    );
  }

  get openButton() {
    return this.getElement().querySelector('.event__rollup-btn');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
