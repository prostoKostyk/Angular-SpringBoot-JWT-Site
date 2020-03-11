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
export class UserService {

  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get(API_URL + "users" );
  }

  getUser(id): Observable<any> {
    return this.http.get(API_URL + "user/" + id);
  }

  edit(user, id): Observable<any> {
    return this.http.put(API_URL + "users/" + id, {
      username: user.username,
      first_name: user.first_name,
      second_name: user.second_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
    }, httpOptions);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + "all", { responseType: "text" });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin", { responseType: "text" });
  }
}
