import { TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ApiHttpClientService } from "./api-http-client.service";

describe("ApiHttpClientService", () => {
  let service: ApiHttpClientService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHttpClientService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
