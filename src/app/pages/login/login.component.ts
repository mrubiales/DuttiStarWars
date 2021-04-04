import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { catchError, finalize, first, flatMap, map, tap } from "rxjs/operators";

// JSON
import usersList from "src/assets/json/users.json";
import { EMPTY, throwError } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { User } from "src/app/core/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public dataLoading: boolean = false;
  public users: any = usersList;
  public authenticationError: boolean = false;
  public invalid: boolean = false;
  public loginSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  public loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.dataLoading = true;
    this.authenticationError = false;
    const loginPayload: any = {
      email: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
    this.authService
      .login(loginPayload)
      .pipe(
        first(),
        catchError((error: any) => {
          console.error("Authentication error: ", error);
          this.authenticationError = true;
          return throwError(error);
        }),
        flatMap((response: any) => {
          this.authService.authToken = response.token;
          return this.userService.fetchUserData(2);
        }),
        tap((response: any) => {
          const user: User = new User(response.data);
          this.userService.user = user;
        }),
        finalize(() => (this.dataLoading = false))
      )
      .subscribe(() => {
        this.loginSuccess = true;
        this.router.navigate([""]);
      });
  }
}
