import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { match } from "src/app/validators/match.validator";
import { PasswordRestoreService } from "src/app/_services/password-restore.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-create-password",
  templateUrl: "./create-password.component.html",
  styleUrls: ["./create-password.component.less"]
})
export class CreatePasswordComponent implements OnInit {
  PasswordsForm: FormGroup;
  private querySubscription: Subscription;
  user;
  email: string;
  token: string;
  constructor(private passwordRestoreService: PasswordRestoreService, private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.token = queryParam.token;
      });
    this.PasswordsForm = new FormGroup({
        "password": new FormControl("", [Validators.required, Validators.min(8)]),
        "passwordConfirm": new FormControl("", [Validators.required])
      }, match("password", "passwordConfirm"));
  }

  ngOnInit() {
    this.passwordRestoreService.confirmReset(this.token).subscribe(
      data => {
        this.user = data;
        this.email = this.user.email;
        window.location.replace("/login");
      },
      err => {
      }
    );
  }

  restore(email: string, password: string): void {
    this.passwordRestoreService.resetPassword(email, password).subscribe(
      data => {
      },
      err => {
      }
    );
  }
}
