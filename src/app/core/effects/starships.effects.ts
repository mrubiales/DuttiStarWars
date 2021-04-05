import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import * as StarshipsActions from "../actions/starships.actions";
import { Starship } from "../models/starship";
import { ShipsService } from "../services/ships.service";
import StarshipsState from "../states/starships.state";
import { environment } from "../../../environments/environment";

@Injectable()
export class StarshipsEffects {
  constructor(private shipsService: ShipsService, private actions$: Actions) {}

  createStarshipsList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(StarshipsActions.createStarshipsListAction),
      flatMap(() =>
        this.shipsService.getShips().pipe(
          map((response: any) => {
            let currentStarShipList: Starship[] = response.results;
            currentStarShipList = this.shipsService.fillStarShipsPicURL(
              currentStarShipList
            );
            const starshipsState: StarshipsState = {
              currentPage: 1,
              itemsPerPage: currentStarShipList.length,
              totalItems: response.count,
              starShipList: currentStarShipList,
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
            let currentStarShipList: Starship[] = response.results;
            currentStarShipList = this.shipsService.fillStarShipsPicURL(
              currentStarShipList
            );
            const starshipsState: StarshipsState = {
              currentPage: action.pageNumber,
              itemsPerPage: currentStarShipList.length,
              totalItems: response.count,
              starShipList: currentStarShipList,
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
