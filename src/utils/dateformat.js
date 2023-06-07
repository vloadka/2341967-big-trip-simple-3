import dayjs from 'dayjs';

export const ToTimeString = (date) => dayjs(date).format('DD/MM/YY HH:mm');
