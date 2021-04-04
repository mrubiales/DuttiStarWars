import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";

import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
