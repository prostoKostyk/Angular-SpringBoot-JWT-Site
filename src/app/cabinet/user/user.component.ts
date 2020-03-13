import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";


@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  providers: [HttpService],
  styleUrls: ["./user.component.less"]
})
export class UserComponent implements OnInit {
  user;
  id: number;
  CurentUserId = 0;
  userChangeMode = false;
  errorMessage = "";
  form: FormGroup;
  constructor(private httpService: HttpService, private userService: UserService, private tokenStorage: TokenStorageService) {
    this.form = new FormGroup({
      "username": new FormControl("", [Validators.required]),
      "first_name": new FormControl("", [Validators.required]),
      "second_name": new FormControl("", [Validators.required]),
      "last_name": new FormControl("", [Validators.required]),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phone_number": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;
      this.userService.getUser(this.id).subscribe(
        data => {
          this.user = data;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }
  onSubmit() {
    this.userService.edit(this.form.value, this.id).subscribe(
      data => {
        this.userService.getUser(this.id).subscribe(
          data2 => {
            this.user = data2;
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.replace("/login");
  }

  change(): void {
    this.userChangeMode = !this.userChangeMode;
    this.form.setValue({
      username: this.user.username,
      second_name: this.user.second_name, first_name: this.user.first_name,
      last_name: this.user.last_name, email: this.user.email, phone_number: this.user.phone_number
    });
  }
}
