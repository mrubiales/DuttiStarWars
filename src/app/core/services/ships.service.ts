import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { ApiHttpClientService } from "../services/api-http-client.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ShipsService {
  public starShipsURL: string = `${environment.starWarsAPIBaseURL}/starships/`;

  constructor(private apiHttpClientService: ApiHttpClientService) {}

  public getShips(): Observable<any> {
    return this.apiHttpClientService.get(this.starShipsURL, {});
  }
}
