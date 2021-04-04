import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import * as StarshipsActions from "../actions/starships.actions";
import { Starship } from "../models/starship";
import { ShipsService } from "../services/ships.service";
import StarshipsState from "../states/starships.state";

@Injectable()
export class StarshipsEffects {
  constructor(private shipsService: ShipsService, private actions$: Actions) {}

  createStarshipsList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(StarshipsActions.createStarshipsListAction),
      flatMap(() =>
        this.shipsService.getShips().pipe(
          map((response: any) => {
            const _starShipList: Starship[] = response.results;
            const starshipsState: StarshipsState = {
              currentPage: 1,
              itemsPerPage: _starShipList.length,
              totalItems: response.count,
              starShipList: _starShipList,
            };
            return StarshipsActions.successCreateStarshipsListAction({
              payload: starshipsState,
            });
          })
        )
      )
    );
  });

  updateStarshipsList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(StarshipsActions.updateStarshipsListAction),
      flatMap((action: any) =>
        this.shipsService.getShips(action.pageNumber).pipe(
          map((response: any) => {
            const _starShipList: Starship[] = response.results;
            const starshipsState: StarshipsState = {
              currentPage: action.pageNumber,
              itemsPerPage: _starShipList.length,
              totalItems: response.count,
              starShipList: _starShipList,
            };
            return StarshipsActions.successUpdateStarshipsListAction({
              payload: starshipsState,
            });
          })
        )
      )
    );
  });
}
