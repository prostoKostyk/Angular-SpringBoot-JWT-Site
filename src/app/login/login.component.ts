import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService } from "../http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  providers: [HttpService],
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  users;
  myForm: FormGroup;
  message = "";
  constructor(private httpService: HttpService) {
    this.myForm = new FormGroup({
      "login": new FormControl(),
      "password": new FormControl()
    });
  }

  ngOnInit() {
    this.httpService.getUsers().subscribe(data => this.users = data);
  }
  login(login: string, password: string): number {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === login || this.users[i].phoneNumber === login) {
        if (this.users[i].password === password) {
          this.message = "Ок";
          return i;
        }
      }
    }
    this.message = "Неверно введён логин или пароль";
  }
}
