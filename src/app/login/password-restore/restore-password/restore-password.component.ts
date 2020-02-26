import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-restore-password",
  templateUrl: "./restore-password.component.html",
  styleUrls: ["./restore-password.component.less"]
})
export class RestorePasswordComponent implements OnInit {

  myForm: FormGroup;
  constructor(private router: Router) {
    this.myForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ])
    });
  }

  ngOnInit() {
  }
  goRestore() {
    this.router.navigate(["/verification-code"]);
  }

}
