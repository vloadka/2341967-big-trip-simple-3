export const Types = {
  Taxi: 'Taxi',
  Bus: 'Bus',
  Train: 'Train',
  Ship: 'Ship',
  Drive: 'Drive',
  Flight: 'Flight',
  'Check-in': 'Check-in',
  Sightseeing: 'Sightseeing',
  Restaurant: 'Restaurant',
};

export class Destination {
  constructor({ id, description, name, pictures }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pictures = pictures || [];
  }
}

// photo = {scr: "", description: ""}

export class Offer {
  constructor({ id, title, price }) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}

// offers = Offer[]
export class OffersByType {
  constructor({ type, offers }) {
    this.type = type;
    this.offers = offers;
  }
}

// offers - Offer.id[] destination - destination.id
export class Point {
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
    this.type = type;
    this.offers = offers;
  }
}

// offers - Offer.id[] destination - destination.id
export class LocalPoint {
  constructor({ basePrice, dateFrom, dateTo, destination, offers, type }) {
    this.basePrice = basePrice;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.destination = destination;
    this.type = type;
    this.offers = offers;
  }
}

export class AuthorizationError {
  constructor({ error, message }) {
    this.error = error;
    this.message = message;
  }
}

export class NotFoundError {
  constructor({ error, message }) {
    this.error = error;
    this.message = message;
  }
}

