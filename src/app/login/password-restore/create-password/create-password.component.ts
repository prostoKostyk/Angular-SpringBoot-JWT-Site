import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { match } from "src/app/validators/match.validator";

@Component({
  selector: "app-create-password",
  templateUrl: "./create-password.component.html",
  styleUrls: ["./create-password.component.less"]
})
export class CreatePasswordComponent implements OnInit {
  PasswordsForm: FormGroup;
  constructor() {
    this.PasswordsForm = new FormGroup({
        "password": new FormControl("", [Validators.required, Validators.min(8)]),
        "passwordConfirm": new FormControl("", [Validators.required])
      }, match("password", "passwordConfirm"));
  }
  ngOnInit() {
  }

}
