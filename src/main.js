import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import initialPoints from './model/generate-trip-point-info';

const filterConteiner = document.querySelector('.trip-controls__filters');
render(new FiltersView,filterConteiner);

const pageContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, points: initialPoints});


boardPresenter.init();
// задание Революция или эволюция? (часть 2) было сделано в предыдущем задание
