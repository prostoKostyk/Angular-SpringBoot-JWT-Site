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
  getCompanies(): Observable<any> {
    return this.http.get(API_URL + "companies");
  }

  getCompany(id): Observable<any> {
    return this.http.get(API_URL + "companies/" + id);
  }

  getUserCompanies(userId): Observable<any> {
    return this.http.get(API_URL + "users/getcompanies/" + userId);
  }

  setCompany(company, userId) {
    return this.http.put(API_URL + "users/add_company/" + userId, {
      name: company.name,
      form: company.form,
      description: company.description,
      foundationDate: company.foundationDate
    }, httpOptions);
  }

  addExistingCompany(company, userId) {
    return this.http.put(API_URL + "users/add_existing_company/" + userId, {
      id: company.id,
      name: company.name,
      form: company.form,
      description: company.description,
      foundationDate: company.foundationDate
    }, httpOptions);
  }

  updateCompany(company, companyId) {
    return this.http.put(API_URL + "companies/" + companyId, {
      name: company.name,
      form: company.form,
      description: company.description,
      foundationDate: company.foundationDate
    }, httpOptions);
  }
}
