import {render} from './framework/render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import initialPoints, { ALLoffers } from './model/generate-trip-point-info';
import WaypointModel from './model/WaypointModel.js';

const filterConteiner = document.querySelector('.trip-controls__filters');
render(new FiltersView,filterConteiner);
const mockData = new WaypointModel(initialPoints, initialPoints, ALLoffers);
const pageContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, points: initialPoints});

boardPresenter.init();


