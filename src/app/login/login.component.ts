import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService } from "../http.service";
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  providers: [HttpService],
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.replace("/cabinet");
      },
      err => {
        this.errorMessage = "Неправильный логин или пароль";
        this.isLoginFailed = true;
      }
    );
  }
}
