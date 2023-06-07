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

for (let i = 0; i < 7; i++) {
  const date = generateRandomDate(new Date('2020-01-01T11:00'), new Date('2020-12-31T11:00'));
  const dateTo = new Date(date.getTime() + 60 * 60 * 24 * 1000);
  initialPoints.push(

    new Point({
      basePrice: getRandomNumber(100, 1000),
      dateFrom: date,
      dateTo: dateTo,
      destination: new Destination({
        id: 1,
        description:
          descriptionVariants[getRandomNumber(0, descriptionVariants.length)],
        name: cities[getRandomNumber(0, cities.length)],
        pictures: [],
      }),
      id: Date.now() + i,
      offers: [
        {
          id: 0,
          title: descriptionVariants[
            getRandomNumber(0, descriptionVariants.length)
          ].slice(0, 10),
          price: getRandomNumber(20, 100),
        },
        {
          id: 1,
          title: descriptionVariants[
            getRandomNumber(0, descriptionVariants.length)
          ].slice(0, 10),
          price: getRandomNumber(20, 100),
        },
      ],
      type: pointTypes[getRandomNumber(0, pointTypes.length)],
    })
  );
}

export default initialPoints;

