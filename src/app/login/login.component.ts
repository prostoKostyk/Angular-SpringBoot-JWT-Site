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
  loginForm = {};
  errorMessage = "";

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login() {
    this.authService.login(this.loginForm).subscribe(
      loginData => {
        this.tokenStorage.saveToken(loginData.accessToken);
        this.tokenStorage.saveUser(loginData);
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
