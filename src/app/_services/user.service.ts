import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalVariable } from "../_helpers/variables.service";

const API_URL = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

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
      firstname: user.firstname,
      secondname: user.secondname,
      lastname: user.lastname,
      phonenumber: user.phonenumber,
      email: user.email,
    }, httpOptions);
  }

  getFindByProject(projectId: number): Observable<any> {
    return this.http.get(API_URL + "findusersbyproject/" + projectId);
  }

  getFindByCompany(companyId: number): Observable<any> {
    return this.http.get(API_URL + "findusersbycompany/" + companyId);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin", { responseType: "text" });
  }
}
