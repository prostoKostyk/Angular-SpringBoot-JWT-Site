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

  /**
   * Метод для отправки запроса для получения всех пользователей
   */
  getUsers(): Observable<any> {
    return this.http.get(API_URL + "users" );
  }

  /**
   * Метод для отправки запроса для получения пользователя
   */
  getUser(id): Observable<any> {
    return this.http.get(API_URL + "user/" + id);
  }

  /**
   * Метод для отправки запроса для изменения пользователя
   */
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

  /**
   * Метод для отправки запроса для получения пользователей с указанным проектом
   */
  getFindByProject(projectId: number): Observable<any> {
    return this.http.get(API_URL + "findusersbyproject/" + projectId);
  }

  /**
   * Метод для отправки запроса для получения пользователей с указанной компанией
   */
  getFindByCompany(companyId: number): Observable<any> {
    return this.http.get(API_URL + "findusersbycompany/" + companyId);
  }
}
