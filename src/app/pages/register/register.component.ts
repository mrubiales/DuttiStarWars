import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  dataLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ["", [Validators.required, Validators.minLength(3)]],
      last_name: ["", [Validators.required, Validators.minLength(3)]],
      username: [
        "eve.holt@reqres.in",
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        "eve.holt@reqres.in",
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const userPayload: any = {
        first_name: this.registerForm.controls.first_name.value,
        last_name: this.registerForm.controls.last_name.value,
        username: this.registerForm.controls.username.value,
        email: this.registerForm.controls.email.value,
        password: "test",
      };

      this.userService
        .register(userPayload)
        .pipe(
          first(),
          catchError((error: any) => {
            console.error("Registration process error: ", error);

            return throwError(error);
          })
        )
        .subscribe(() => this.router.navigate(["/login"]));
    }
  }
}
