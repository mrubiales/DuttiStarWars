import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { ApiHttpClientService } from "../services/api-http-client.service";
import { environment } from "../../../environments/environment";
import { Starship } from "../models/starship";

@Injectable({
  providedIn: "root",
})
export class ShipsService {
  public starShipsURL: string = `${environment.starWarsAPIBaseURL}/starships/`;

  constructor(private apiHttpClientService: ApiHttpClientService) {}

  public getShips(pageNumber?: number): Observable<any> {
    const params: any = pageNumber ? { page: pageNumber } : {};
    return this.apiHttpClientService.get(this.starShipsURL, params);
  }

  public fillStarShipsPicURL(starShipList: Starship[]): Starship[] {
    starShipList
      .filter((starShip: Starship) => !starShip.picURL)
      .map((starShip: Starship) => {
        const starShipId: number = this.getStarShipId(starShip);
        starShip.picURL = `${environment.starWarsVisualGuideURL}/${starShipId}.jpg`;

        return starShip;
      });

    return starShipList;
  }

  public getStarShipId(starShip: Starship): number {
    const arrangedURL: string = starShip.url.replace(/\/+$/, "");
    const slicesURL = arrangedURL.split("/");

    return parseInt(slicesURL.pop());
  }
}
