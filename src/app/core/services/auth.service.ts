import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, of } from "rxjs";
import { ApiHttpClientService } from "./api-http-client.service";
import { BrowserStorageService } from "./browser-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authToken: string;

  constructor(
    private browserStorageService: BrowserStorageService,
    private apiHttpClientService: ApiHttpClientService
  ) {
    this._authToken = this.browserStorageService.getStorage("authToken");
  }

  public isLoggedIn(): boolean {
    // Se podría añadir más lógica en este método si el token emitido por la API fuera un JWT válido
    return !!this.authToken;
  }

  public get authToken(): string {
    return this._authToken;
  }

  public set authToken(authToken: string) {
    this._authToken = authToken;
    this.browserStorageService.setStorage("authToken", authToken);
  }

  public deleteAuthToken(): void {
    this._authToken = undefined;
    this.browserStorageService.setStorage("authToken", undefined);
  }

  public login(params: any): Observable<any> {
    const url = `${environment.apiLoginBaseURL}/login`;

    return this.apiHttpClientService.post(url, params, true);
  }
}
