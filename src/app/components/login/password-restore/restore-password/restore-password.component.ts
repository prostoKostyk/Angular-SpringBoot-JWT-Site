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

  message: string;

  emailForm: FormGroup;

  send: boolean;
  successSend: boolean;
  falseSend: boolean;

  constructor(private router: Router, private passwordRestoreService: PasswordRestoreService ) {
    this.emailForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ])
    });
  }

  ngOnInit() {
  }

  /**
   * Метод для отправки сообщени пользователю с ссылкой на восстановление пароля
   */
  sendEmail(email) {
    this.send = true;
    this.passwordRestoreService.sendEmail(email).subscribe(
      data => {
        this.message = "На вашу почту " + email + " было отправлено письмо с дальнейшими указаниями";
        this.successSend = true;
        this.falseSend = false;
      },
      err => {
        this.falseSend = true;
        this.message = "Не удалось отправить письмо";
        // this.message = err.error.message;
      }
    );
  }

}
