import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PasswordRestoreService } from "src/app/_services/password-restore.service";

@Component({
  selector: "app-restore-password",
  templateUrl: "./restore-password.component.html",
  styleUrls: ["./restore-password.component.less"]
})
export class RestorePasswordComponent implements OnInit {

  myForm: FormGroup;
  constructor(private router: Router, private passwordRestoreService: PasswordRestoreService ) {
    this.myForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ])
    });
  }
  message: string;
  successSend: boolean;

  ngOnInit() {
  }
  sendEmail(email) {
    this.passwordRestoreService.sendEmail(email).subscribe(
      data => {
        this.message = "На вашу почту " + email + " было отправлено письмо с дальнейшими указаниями";
        this.successSend = true;
      },
      err => {
        this.message = "Пользователь с адресом " + email + " не зарегистрирован";
        this.successSend = false;
      }
    );
  }

}
