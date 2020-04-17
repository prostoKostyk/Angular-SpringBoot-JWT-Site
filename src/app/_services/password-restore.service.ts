import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalVariable } from "../_helpers/variables.service";

const API_URL = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: "root"
})
export class PasswordRestoreService {

  constructor(private http: HttpClient) { }

  /**
   * Метод для отправки запроса для создания токена для
   * восстановления пароля и его отправки на почту
   */
  sendEmail(userEmail: string): Observable<any> {
    return this.http.post(API_URL + "forgot-password", {
      email: userEmail
    }, httpOptions);
  }

  /**
   * Метод для отправки запроса для проверки токена и
   * получения данных пользователяв случае успешной проверки
   */
  confirmReset(token): Observable<any> {
    return this.http.get(API_URL + "confirm-reset?token=" + token);
  }

  /**
   * Метод для отправки запроса для изменения пароля пользователя
   */
  resetPassword(userEmail: string, userPassword: string): Observable<any> {
    return this.http.post(API_URL + "reset-password", {
      email: userEmail,
      password: userPassword
    }, httpOptions);
  }
}
