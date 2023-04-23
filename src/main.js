import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const filterConteiner = document.querySelector('.trip-controls__filters');
render(new FiltersView,filterConteiner);

const pageContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: pageContainer});


boardPresenter.init();


