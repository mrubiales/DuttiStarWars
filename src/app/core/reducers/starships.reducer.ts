import { createReducer, on, Action } from "@ngrx/store";
import StarshipsState, { initializeState } from "../states/starships.state";
import { Starship } from "../models/starship";
import * as StarshipsActions from "../actions/starships.actions";

const initialState = initializeState();

const reducer = createReducer(
  initializeState,
  on(StarshipsActions.getStarshipsListAction, (state) => state),
  on(
    StarshipsActions.successCreateStarshipsListAction,
    (state: any, { payload }) => {
      return {
        ...state,
        itemsPerPage: payload.itemsPerPage,
        currentPage: payload.currentPage,
        totalItems: payload.totalItems,
        starShipList: payload.starShipList,
      };
    }
  ),
  on(
    StarshipsActions.successUpdateStarshipsListAction,
    (state: any, { payload }) => {
      return {
        ...state,
        currentPage: payload.currentPage,
        totalItems: payload.totalItems,
        starShipList: payload.starShipList,
      };
    }
  )
);

export function StarshipsReducer(
  state: StarshipsState | undefined,
  action: Action
): StarshipsState {
  return reducer(state, action);
}
