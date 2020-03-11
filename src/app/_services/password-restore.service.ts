import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const API_URL = "http://localhost:8080/";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class PasswordRestoreService {

  constructor(private http: HttpClient) { }

  sendEmail(userEmail: string): Observable<any> {
    return this.http.post(API_URL + "forgot-password", {
      email: userEmail
    }, httpOptions);
  }

  confirmReset(token): Observable<any> {
    return this.http.get(API_URL + "confirm-reset?token=" + token);
  }

  resetPassword(userEmail: string, userPassword: string): Observable<any> {
    return this.http.post(API_URL + "reset-password", {
      email: userEmail,
      password: userPassword
    }, httpOptions);
  }
}
