import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { ApiHttpClientService } from "./api-http-client.service";
import { BrowserStorageService } from "./browser-storage.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public userDataURL: string = `${environment.apiLoginBaseURL}/users`;
  private _user: User;
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    undefined
  );

  constructor(
    private browserStorageService: BrowserStorageService,
    private apiHttpClientService: ApiHttpClientService
  ) {
    this.user = this.browserStorageService.getStorageJSON("user");
  }

  public getCurrentUser$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public setCurrentUser$(user: User): void {
    this.currentUser$.next(user);
  }

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
    this.browserStorageService.setStorage("user", user);
    this.setCurrentUser$(user);
  }

  public register(userPayLoad: any): Observable<any> {
    const url = `${environment.apiLoginBaseURL}/register`;

    return this.apiHttpClientService.post(url, userPayLoad, true);
  }
  public fetchUserData(userId: number): Observable<any> {
    return this.apiHttpClientService.get(`${this.userDataURL}/${userId}`, {});
  }
}
