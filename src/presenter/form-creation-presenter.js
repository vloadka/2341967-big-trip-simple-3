import { render, remove, RenderPosition } from '../framework/render';
import EditFormView from '../view/edit-form-view';
import { ACTION_TYPE, UpdateType } from '../utils/constants';


export default class FormCreationPresenter {
  #handleInfoChange = null;
  #handleDestroy = null;
  #waypointListContainer = null;
  #EditFormComponent = null;

  constructor({waypointListContainer, handleInfoChange, handleDestroy}) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleInfoChange = handleInfoChange;
    this.#handleDestroy = handleDestroy;
  }

  init(destinations, offers) {
    if (this.#EditFormComponent !== null) {
      return;
    }

    this.#EditFormComponent = new EditFormView({
      destinations: destinations,
      offers: offers,
      isEditForm: false
    });
    this.#EditFormComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#EditFormComponent.setDeleteHandler(this.#handleDeleteClick);

    render(this.#EditFormComponent, this.#waypointListContainer,
      RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#escapeHandler);
  }

  destroy() {
    if (this.#EditFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#EditFormComponent);
    this.#EditFormComponent = null;

    document.body.removeEventListener('keydown', this.#escapeHandler);
  }


  #escapeHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (waypoint) => {
    this.#handleInfoChange(
      ACTION_TYPE.ADD_WAYPOINT,
      UpdateType.MAJOR,
      {id: Date.now(), ...waypoint}
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
