import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  inject,
} from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";

import { LoginComponent } from "./login.component";
import { Observable, of } from "rxjs";

class MockAuthService {
  responseLogin = {
    token: "test",
  };
  login(params: any): Observable<any> {
    return of(this.responseLogin);
  }
}
describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          FormsModule,
          HttpClientTestingModule,
          ReactiveFormsModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: AuthService,
            useClass: AuthService,
          },
          {
            provide: UserService,
            useClass: UserService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Login process fails when the login form is invalid", inject(
    [FormBuilder, Router, AuthService, UserService],
    (
      formBuilder: FormBuilder,
      router: Router,
      authService: AuthService,
      userService: UserService
    ) => {
      const userMock = {
        data: {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
        },
      };
      let component = new LoginComponent(
        formBuilder,
        router,
        authService,
        userService
      );
      component.loginForm = formBuilder.group({
        username: ["", [Validators.required, Validators.minLength(3)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
      });
      spyOn(authService, "login").and.returnValue(of({ token: "1234567" }));
      spyOn(userService, "fetchUserData").and.returnValue(of(userMock));
      component.loginUser();
      expect(component.loginSuccess).toBe(false);
    }
  ));

  it("Login process success when the login form is valid", inject(
    [FormBuilder, Router, AuthService, UserService],
    (
      formBuilder: FormBuilder,
      router: Router,
      authService: AuthService,
      userService: UserService
    ) => {
      const userMock = {
        data: {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
        },
      };
      let component = new LoginComponent(
        formBuilder,
        router,
        authService,
        userService
      );
      component.loginForm = formBuilder.group({
        username: ["", [Validators.required, Validators.minLength(3)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
      });
      component.loginForm.controls.username.setValue(userMock.data.email);
      component.loginForm.controls.password.setValue("1234567");
      spyOn(authService, "login").and.returnValue(of({ token: "1234567" }));
      spyOn(userService, "fetchUserData").and.returnValue(of(userMock));
      component.loginUser();
      expect(component.loginSuccess).toBe(true);
    }
  ));
});
