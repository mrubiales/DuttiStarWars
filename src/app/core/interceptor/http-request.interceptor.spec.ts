import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { inject, TestBed, waitForAsync } from "@angular/core/testing";

import { HttpRequestInterceptor } from "./http-request.interceptor";

describe("HttpRequestInterceptor", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptor,
          multi: true,
        },
      ],
    })
  );

  it("should be created ", inject(
    [HTTP_INTERCEPTORS],
    (interceptor: HttpRequestInterceptor) => {
      expect(interceptor).toBeTruthy();
    }
  ));
});
