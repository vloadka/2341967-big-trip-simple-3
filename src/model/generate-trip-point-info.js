import { Point, Destination } from './trip-point';

const initialPoints = [];

export const cities = [
  'Paris',
  'Dubai',
  'Istanbul',
  'Berlin',
  'Rome',
  'Madrid',
  'Barcelona',
  'London',
  'Tokyo',
];
export const pointTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];
const getRandomNumber = (start, end) => Math.floor(start + Math.random() * end);

export const ALLoffers = [
  {
    type: 'taxi',
    offers: [{
      id: 1,
      title: 'Upgrade a business class',
      price: 100
    }, {
      id: 2,
      title: 'Switch to comfort',
      price: 20
    }]
  },

  {
    type: 'bus',
    offers: [{
      id: 3,
      title: 'Choose seats',
      price: 35
    },

    {
      id: 4,
      title: 'Comfort bus',
      price: 200
    }]
  },
  {
    type: 'train',
    offers: [{
      id: 5,
      title: 'Add meal',
      price: 90
    }, {
      id: 6,
      title: 'Choose seats',
      price: 35
    } ]
  },
  {
    type: 'ship',
    offers: [{
      id: 7,
      title: 'Add meal',
      price: 90
    }, {
      id: 8,
      title: 'Choose seats',
      price: 35
    } ]
  },
  {
    type: 'drive',
    offers: [{
      id: 9,
      title: 'Comfortable car',
      price: 300
    }]
  },
  {
    type: 'flight',
    offers: [{
      id: 10,
      title: 'Add luggage',
      price: 20
    },
    {
      id: 11,
      title: 'Add meal',
      price: 90
    }, {
      id: 12,
      title: 'Choose seats',
      price: 35
    }]
  },
  {
    type: 'check-in',
    offers: [{
      id: 13,
      title: 'No queue',
      price: 150
    }]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'restaurant',
    offers: [{
      id: 14,
      title: 'Choose seats',
      price: 35
    }]
  },
];

const descriptionVariants = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateRandomDate = (from, to) => new Date(
  from.getTime() + Math.random() * (to.getTime() - from.getTime())
);

const getRandomPictures = () => Array.from({ length: Math.floor(Math.random() * 6) + 1 }).map(() => ({
  src: `img/photos/${getRandomNumber(1, 5)}.jpg`,
  description: descriptionVariants[getRandomNumber(0, descriptionVariants.length)],
}));

const getRandomDestination = (id, city) => new Destination({
  id: id,
  description:  descriptionVariants[getRandomNumber(0, descriptionVariants.length)],
  name: city,
  pictures: getRandomPictures(),
});

export const ALLdestinations = cities.map((el,i )=> getRandomDestination(i, el));


for (let i = 0; i < ALLdestinations.length; i++) {
  const date = generateRandomDate(new Date('2020-01-01T11:00'), new Date('2020-12-31T11:00'));
  const dateTo = new Date(date.getTime() + 60 * 60 * 24 * 1000);
  const type = pointTypes[getRandomNumber(0, pointTypes.length)];

  initialPoints.push(
    new Point({
      basePrice: getRandomNumber(100, 1000),
      dateFrom: date.toISOString(),
      dateTo: dateTo.toISOString(),
      type: type,
      id: Date.now() + i,
      destination: ALLdestinations[i],
      offers: []
    })
  );
}

export default initialPoints;
