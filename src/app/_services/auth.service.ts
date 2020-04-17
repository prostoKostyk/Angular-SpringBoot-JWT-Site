import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalVariable } from "../_helpers/variables.service";

const AUTH_API = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }
  /**
   * Метод для отправки запроса логина
   */
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + "signin", {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  /**
   * Метод для отправки запроса регистрации
   */
  register(user): Observable<any> {
    return this.http.post(AUTH_API + "signup", {
      username: user.value.username,
      firstname: this.upCaseFirst(user.value.firstname),
      secondname: this.upCaseFirst(user.value.secondname),
      lastname: this.upCaseFirst(user.value.lastname),
      phonenumber: user.value.phonenumber,
      email: user.value.email,
      password: user.value.PasswordsForm.password
    }, httpOptions);
  }

  /**
   * Метод для конвентирования первой буквы строки в большую.
   */
  upCaseFirst(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }
}
