import { createAction, props } from "@ngrx/store";
import StarshipsState from "../states/starships.state";

export const getStarshipsListAction = createAction(
  "[StarshipsList] Get current StarshipsList"
);
export const createStarshipsListAction = createAction(
  "[StarshipsList] Create StarshipsList"
); //effect
export const successCreateStarshipsListAction = createAction(
  "[StarshipsList] Success Create StarshipsList",
  props<{ payload: StarshipsState }>()
);
export const updateStarshipsListAction = createAction(
  "[StarshipsList] Update StarshipsList",
  props<{ pageNumber: number }>()
); //effect
export const successUpdateStarshipsListAction = createAction(
  "[StarshipsList] Success Update StarshipsList",
  props<{ payload: StarshipsState }>()
);
