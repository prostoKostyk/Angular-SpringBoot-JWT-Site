import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalVariable } from "../_helpers/variables.service";

const API_URL = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: "root"
})
export class CompaniesService {

  constructor(private http: HttpClient) { }
  /**
   * Метод для отправки запроса для получения всех компаний
   */
  getCompanies(): Observable<any> {
    return this.http.get(API_URL + "companies");
  }

  /**
   * Метод для отправки запроса для получения компании по id
   */
  getCompany(id): Observable<any> {
    return this.http.get(API_URL + "companies/" + id);
  }

  /**
   * Метод для отправки запроса для получения всех компаний пользователя.
   */
  getUserCompanies(userId): Observable<any> {
    return this.http.get(API_URL + "users/getcompanies/" + userId);
  }

  /**
   * Метод для отправки запроса для создания новой компании и её
   * добавления пользователю
   */
  addNewCompany(company, userId) {
    return this.http.put(API_URL + "users/add_company/" + userId, {
      name: company.name,
      form: (company.form).toUpperCase(),
      description: company.description,
      foundationDate: company.foundationDate
    }, httpOptions);
  }

  /**
   * Метод для отправки запроса для добавления пользователю
   * существующей компании
   */
  addExistingCompany(company, userId) {
    return this.http.put(API_URL + "users/add_existing_company/" + userId, {
      id: company.id,
      name: company.name,
      form: company.form,
      description: company.description,
      foundationDate: company.foundationDate
    }, httpOptions);
  }

  /**
   * Метод для отправки изменения компании
   */
  updateCompany(company, companyId) {
    return this.http.put(API_URL + "companies/" + companyId, {
      name: company.name,
      form: (company.form).toUpperCase(),
      description: company.description,
      foundationDate: company.foundationDate
    }, httpOptions);
  }
}
