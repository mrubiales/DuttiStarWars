import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { ShipsDetailsComponent } from "./ships-details.component";
import { StoreModule } from "@ngrx/store";
import { Component, Pipe, PipeTransform } from "@angular/core";

describe("ShipsDetailsComponent", () => {
  let component: ShipsDetailsComponent;
  let fixture: ComponentFixture<ShipsDetailsComponent>;

  @Component({
    selector: "pagination-controls",
    template: "<p>Mock Pagination controls Component</p>",
  })
  class MockPaginationControls {}
  @Pipe({ name: "paginate" })
  class MockPipe implements PipeTransform {
    transform(value: number): number {
      //Do stuff here, if you want
      return value;
    }
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, StoreModule.forRoot([])],
        declarations: [ShipsDetailsComponent, MockPaginationControls, MockPipe],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsDetailsComponent);
    component = fixture.componentInstance;
    component.dataList = {};
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
