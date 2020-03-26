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

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + "signin", {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + "signup", {
      username: user.username,
      firstName: user.firstName,
      secondName: user.secondName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
