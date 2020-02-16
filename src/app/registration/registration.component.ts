import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { match } from "../validators/match.validator";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.less"]
})
export class RegistrationComponent implements OnInit {
  myForm: FormGroup;
  constructor() {
    this.myForm = new FormGroup({
      FIOForm: new FormGroup({
        "firstName": new FormControl("", [Validators.required]),
        "secondName": new FormControl("", [Validators.required]),
        "lastName": new FormControl("", [Validators.required])
      }),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phone": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
      PasswordsForm: new FormGroup({
        "password": new FormControl("", [Validators.required, Validators.min(8)]),
        "passwordConfirm": new FormControl("", [Validators.required])
      }, match("password", "passwordConfirm"))
    });
  }

  ngOnInit() {
  }

}
