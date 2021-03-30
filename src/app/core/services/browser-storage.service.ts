import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class BrowserStorageService {
  public storageType: Storage;
  constructor() {
    this.storageType = environment.storageType;
  }

  public setStorageType(storageType: Storage): void {
    this.storageType = storageType;
  }

  public getStorage(key: string): any {
    try {
      return this.storageType.getItem(key) !== null &&
        this.storageType.getItem(key) !== "undefined"
        ? this.storageType.getItem(key)
        : undefined;
    } catch (error) {
      return undefined;
    }
  }

  public getStorageJSON(key: string): any {
    try {
      return this.storageType.getItem(key) !== null &&
        this.storageType.getItem(key) !== "undefined"
        ? JSON.parse(this.storageType.getItem(key))
        : undefined;
    } catch (error) {
      return undefined;
    }
  }

  public setStorage(key: string, value: any): void {
    if (value) {
      const stringifyedValue: string =
        typeof value === "string" ? value : JSON.stringify(value);
      this.storageType.setItem(key, stringifyedValue);
    } else {
      this.storageType.removeItem(key);
    }
  }

  public removeStorageItem(key: string): void {
    this.storageType.removeItem(key);
  }
}
