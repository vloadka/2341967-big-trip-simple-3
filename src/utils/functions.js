import { FilterType, sortingType } from './constants';
import dayjs from 'dayjs';
export const filter = (filterType, points) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return points.filter((point) => dayjs().isBefore(point.dateFrom, 'D'));
  }

  return points;
};

export const sort = (sortType) => {
  switch (sortType) {
    case sortingType.price:
      return (pointA, pointB) => pointB.basePrice - pointA.basePrice;
    case sortingType.day:
      return (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
    default:
      return () => 0;
  }
};
