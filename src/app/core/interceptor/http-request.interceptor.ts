import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";

import { Observable, of } from "rxjs";
import { ApiHttpClientService } from "../services/api-http-client.service";
import { environment } from "../../../environments/environment";
import { AuthService } from "../services/auth.service";
import { share, tap } from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private cachedData = new Map<string, HttpResponse<any>>();

  constructor(
    private authService: AuthService,
    private apiHttpClientService: ApiHttpClientService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    const apiCredentials: string = this.apiHttpClientService.apiCredentials;
    if (request.headers.has(apiCredentials)) {
      request = this.deleteHeader(request, apiCredentials);
      request = this.addAuthenticationToken(request);
    }

    if (request.method !== "GET" || !request.headers.has("x-cache")) {
      return next.handle(request);
    }

    request = this.deleteHeader(request, "x-cache");
    const cachedResponse: HttpResponse<any> = this.cachedData.get(
      request.urlWithParams
    );
    if (cachedResponse) {
      console.log("RESPONSE CACHED", this.cachedData);
      return of(cachedResponse.clone());
    }

    return next.handle(request).pipe(
      tap((httpEvent: any) => {
        if (httpEvent instanceof HttpResponse) {
          this.cachedData.set(request.urlWithParams, httpEvent.clone());
        }
        console.log("TAP CACHE", this.cachedData);
      }),
      share()
    );
  }

  private deleteHeader(
    request: HttpRequest<any>,
    headerName: string
  ): HttpRequest<any> {
    if (request.headers.has(headerName)) {
      const headers = request.headers.delete(headerName);
      request = request.clone({ headers });
    }
    return request;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const authToken: string = this.authService?.authToken;

    if (!authToken) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(
        "Authorization",
        `${environment.tokenType} ${authToken}`
      ),
    });
  }
}
