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
export class CompaniesService {

  constructor(private http: HttpClient) { }
  getCompanies(): Observable<any> {
    return this.http.get(API_URL + "companies");
  }

  getCompany(id): Observable<any> {
    return this.http.get(API_URL + "companies/" + id);
  }

  setCompany(company, userId) {
    return this.http.put(API_URL + "users/add_company/" + userId, {
      name: company.name,
      form: company.form,
      description: company.description,
      foundation_date: company.foundation_date
    }, httpOptions);
  }

  addExistingCompany(company, userId) {
    return this.http.put(API_URL + "users/add_existing_company/" + userId, {
      id: company.id,
      name: company.name,
      form: company.form,
      description: company.description,
      foundation_date: company.foundation_date
    }, httpOptions);
  }

  updateCompany(company, companyId) {
    return this.http.put(API_URL + "companies/" + companyId, {
      name: company.name,
      form: company.form,
      description: company.description,
      foundation_date: company.foundation_date
    }, httpOptions);
  }
}
