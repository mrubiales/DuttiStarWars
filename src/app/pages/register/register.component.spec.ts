import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { RegisterComponent } from "./register.component";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/services/user.service";
import { LoginComponent } from "../login/login.component";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterComponent, LoginComponent],
        imports: [
          FormsModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: "login", component: LoginComponent },
          ]),
          ReactiveFormsModule,
        ],
        providers: [
          {
            provide: UserService,
            useClass: UserService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Login process fails when the login form is invalid", inject(
    [FormBuilder, Router, UserService],
    (formBuilder: FormBuilder, router: Router, userService: UserService) => {
      const dataUserMock = {
        username: "eve.holt@reqres.in",
        email: "eve.holt@reqres.in",
        first_name: "Eve",
        last_name: "Holt",
      };
      let component = new RegisterComponent(formBuilder, router, userService);
      component.registerForm = formBuilder.group({
        first_name: ["", [Validators.required, Validators.minLength(3)]],
        last_name: ["", [Validators.required, Validators.minLength(3)]],
        username: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.minLength(6)]],
      });
      spyOn(userService, "register").and.returnValue(of(true));
      component.registerUser();
      expect(component.resgisterSuccess).toBe(false);
    }
  ));
  it("Login process success when the login form is valid", inject(
    [FormBuilder, Router, UserService],
    (formBuilder: FormBuilder, router: Router, userService: UserService) => {
      const dataUserMock = {
        username: "eve.holt@reqres.in",
        email: "eve.holt@reqres.in",
        first_name: "Eve",
        last_name: "Holt",
      };
      let component = new RegisterComponent(formBuilder, router, userService);
      component.registerForm = formBuilder.group({
        first_name: ["", [Validators.required, Validators.minLength(3)]],
        last_name: ["", [Validators.required, Validators.minLength(3)]],
        username: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.minLength(6)]],
      });
      component.registerForm.controls.first_name.setValue(
        dataUserMock.first_name
      );
      component.registerForm.controls.last_name.setValue(
        dataUserMock.last_name
      );
      component.registerForm.controls.username.setValue(dataUserMock.username);

      component.registerForm.controls.email.setValue(dataUserMock.email);
      spyOn(userService, "register").and.returnValue(of(true));
      component.registerUser();
      expect(component.resgisterSuccess).toBe(true);
    }
  ));
});
