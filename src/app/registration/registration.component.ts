import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { match } from "../validators/match.validator";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.less"]
})
export class RegistrationComponent implements OnInit {
  errorMessage = "";

  isSuccessful = false;
  isSignUpFailed = false;

  form = {};

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      "username": new FormControl("", []),
      "firstname": new FormControl("", [Validators.required]),
      "secondname": new FormControl("", [Validators.required]),
      "lastname": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "phonenumber": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
      PasswordsForm: new FormGroup({
        "password": new FormControl("", [Validators.required, Validators.min(8)]),
        "passwordConfirm": new FormControl("", [Validators.required])
      }, match("password", "passwordConfirm"))
    });
  }

  ngOnInit() {
  }

  registration() {
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(["/login"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
