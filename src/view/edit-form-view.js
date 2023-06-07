import { pointTypes } from '../model/generate-trip-point-info.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import {ToTimeString} from '../utils/dateformat.js';
import 'flatpickr/dist/flatpickr.min.css';

const formatDateToEdit = (date) => {
  const datenew = date.toLocaleString('en-GB', {
    timeZone: 'UTC',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return datenew;
};

function renderEventTypes(selectedType) {
  return pointTypes.map((type) => `
  <div class="event__type-item">
    <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type-${type}" value="${type}" ${(type === selectedType) ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`
  ).join('');
}

function renderResetButton(isEditForm) {
  return (!isEditForm) ? '' : `
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;
}

function renderPictures(destination) {
  if( !destination.pictures.length ) {
    return '';
  }

  return `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${destination.pictures.map((pic) => `
      <img class="event__photo" src="${pic.src}" alt="${pic.description}">
      `).join('')}
    </div>
  </div>`;
}

const renderOffers = (aviableOffers, selectedOffers) => (aviableOffers
  .map((offer) => {
    const isOfferChecked = selectedOffers.find((el) => el.id === offer.id) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="${offer.id}" ${isOfferChecked ? "checked" : ""} >
      <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  })
  .join('')
);

function createEditFormTemplate(
  { point,
    isEditForm,
    destinations,
  }
) {

  const destination = destinations.find((el) => el.id === point.destination?.id);
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">


        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
          ${
  renderEventTypes(point.type)
}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-${point.id}">
      ${point.type[0].toUpperCase() + point.type.slice(1)}
      </label>
      <input class="event__input required event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${(destination) ? destination.name : ''}" list="destination-list-${point.id}">
      <datalist id="destination-list-${point.id}">
      ${destinations
    .map((dest) => `<option value="${dest.name}">${dest.name}</option>`)
    .join('')}

      </datalist>
    </div>


      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${formatDateToEdit(
  point.dateFrom
)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${formatDateToEdit(
  point.dateTo
)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${point.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${point.id}" type="number" name="event-price"  value="${point.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${(isEditForm) ? 'Delete' : 'Cancel'}</button>
      ${renderResetButton(isEditForm)}
    </header>

    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">


        ${renderOffers(point.aviableOffers, point.offers, point.id)}


        </div>
      </section>

     ${ destination ?
    ` <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${
  `${destination.name }. ${ destination.description}`}
      </p>
      ${renderPictures(point.destination)}
      </section>` : ''
}

    </section>
  </form>
  </li>`;
}

const editBlank = {
  basePrice: 100,
  dateFrom: '2023-01-01T20:00:00.000Z',
  dateTo: '2023-01-02T21:00:00.000Z',
  destination: undefined,
  id: Date.now(),
  offers: [],
  type: 'bus',
};

export default class EditFormView extends AbstractStatefulView {
  #DateFromPicker = null;
  #DateToPicker = null;
  #isEditForm = null;
  #destinations = null;
  #offers = null;

  constructor({
    point = editBlank,
    destinations,
    offers,
    isEditForm = true,
  }) {
    super();
    this._setState({
              ...point,
              aviableOffers: offers.find((el) => el.type === point.type).offers,
            }),
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isEditForm = isEditForm;
    this._restoreHandlers();
  }

  setDeleteHandler(callback) {
    this._callback.delete = callback;
    this.deleteButton.addEventListener('click', this.#deleteHandler);
  }

  #deleteHandler = (e) => {
    e.preventDefault();

    const state = {...this._state};
    delete state.aviableOffers;

    this._callback.delete();
  };

  get template() {
    return createEditFormTemplate(
      {point: this._state, isEditForm: this.#isEditForm, destinations: this.#destinations, offers: this.#offers},
    );
  }

  reset(waypoint) {
    this.updateElement(
      {...waypoint,
        aviableOffers: this.#offers.find((el) => el.type === waypoint.type).offers
      }
    );
  }

  _restoreHandlers() {

    this.#renderDateFromPicker();
    this.#renderDateToPicker();
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerClickHandler);

    this.deleteButton.addEventListener('click', this.#deleteHandler);

    if (this.#isEditForm) {
      this.closeButton.addEventListener('click', this.#closeHandler);
      this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitHandler);
    }
  }

  #renderDateFromPicker() {
    this.#DateFromPicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: ToTimeString(this._state.dateFrom),
        onChange: this.#DateFromOnChange,
      },
    );
  }

  #DateFromOnChange = ([date]) => {
    this.updateElement({
      dateFrom: date.toISOString(),
    });
    this.#DateToPicker.set('minDate', date);
  };


  #DateToOnChange = ([date]) => {
    this.updateElement({
      dateTo: date.toISOString(),
    });
  };

  #renderDateToPicker() {
    this.#DateToPicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: ToTimeString(this._state.dateTo),
        minDate: ToTimeString(this._state.dateFrom),
        onChange: this.#DateToOnChange,
      },
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#DateFromPicker) {
      this.#DateFromPicker.destroy();
      this.#DateFromPicker = null;
    }

    if (this.#DateToPicker) {
      this.#DateToPicker.destroy();
      this.#DateToPicker = null;
    }
  }

  #eventTypeChangeHandler = (e) => {
    e.preventDefault();
    this.updateElement({
      type: e.target.value,
      selectedOffers: [],
      aviableOffers: this.#offers.find((el) => el.type === e.target.value).offers,
    });
  };

  #destinationChangeHandler = (e) => {
    e.preventDefault();
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === e.target.value),
    });
  };

  #priceChangeHandler = (e) => {
    e.preventDefault();
    this._setState({
      basePrice: e.target.value,
    });
  };

  #offerClickHandler = (e) => {
    e.preventDefault();
    const selectedOffer = this._state.aviableOffers.find((offer) => String(offer.id) === e.target.name);
    let selectedOffersNew = [...this._state.offers];

    if (selectedOffersNew.find((offer) => offer.id === selectedOffer.id)) {
      selectedOffersNew = selectedOffersNew.filter((offer) => offer.id !== selectedOffer.id);
    } else {
      selectedOffersNew.push(selectedOffer);
    }
    this._setState({
      offers: selectedOffersNew
    });

  };


  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.submitButton.addEventListener('click', this.#submitHandler);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();

    const state = {...this._state};
    delete state.aviableOffers;
    this._callback.submit(state);
  };

  setCloseHandler(callback) {
    this._callback.close = callback;
    this.closeButton.addEventListener('click', this.#closeHandler);
  }

  #closeHandler = (evt) => {
    evt.preventDefault();
    this._callback.close();
  };

  get submitButton() {
    return this.element.querySelector('.event__save-btn');
  }

  get closeButton() {
    return this.element.querySelector('.event__rollup-btn');
  }

  get deleteButton() {
    return this.element.querySelector('.event__reset-btn');
  }
}

