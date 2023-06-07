import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import WaypointModel from './model/waypoint-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
const filterConteiner = document.querySelector('.trip-controls__filters');
import WaypointApiService from './API.js';

const AUTH = 'Basic bigTrip928929';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const api = new WaypointApiService(END_POINT, AUTH);


const pageContainer = document.querySelector('.trip-events');
const filterModel = new FilterModel();


const offersModel = new OfferModel(api);
const destinationModel = new DestinationModel(api);
const waypointModel = new WaypointModel(api);

const boardPresenter = new BoardPresenter({boardContainer: pageContainer, waypointModel: waypointModel, destinationModel: destinationModel, offerModel: offersModel, filterModel: filterModel, handleFormCreationDestroy: handleFormCreationDestroy});
const filterPresenter = new FilterPresenter(filterConteiner, filterModel, waypointModel);

const newPointButttonView = new NewPointButtonView(
  handleOpenCreateForm
);

const siteHeaderElement = document.querySelector('.trip-main');

function handleFormCreationDestroy() {
  newPointButttonView.element.disabled = false;
}

function handleOpenCreateForm() {
  boardPresenter.createWaypoint();
  newPointButttonView.element.disabled = true;
}

filterPresenter.init();
boardPresenter.init();
// задание Пришёл, увидел, загрузил (часть 2) было сделано в предыдущем задание

waypointModel.init()
  .finally(() => {
    render(newPointButttonView, siteHeaderElement);
  });

