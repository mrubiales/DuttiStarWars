import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { ApiHttpClientService } from "../services/api-http-client.service";
import { environment } from "../../../environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private apiHttpClientService: ApiHttpClientService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiCredentials: string = this.apiHttpClientService.apiCredentials;
    if (request.headers.has(apiCredentials)) {
      const headers = request.headers.delete(apiCredentials);
      request = request.clone({ headers });
      request = this.addAuthenticationToken(request);
    }

    return next.handle(request);
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
