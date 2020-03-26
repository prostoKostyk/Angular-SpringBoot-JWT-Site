import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalVariable } from "../_helpers/variables.service";

const API_URL = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: "root"
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<any> {
    return this.http.get(API_URL + "experiences");
  }

  getExperience(id): Observable<any> {
    return this.http.get(API_URL + "experiences/" + id);
  }

  addExperience(experience, userId) {
    return this.http.put(API_URL + "users/add_experience/" + userId, {
      company: experience.company,
      position: experience.position,
      beginning_date: experience.beginning_date,
      end_date: experience.end_date,
      experience_months: experience.experience_months
    }, httpOptions);
  }

  deleteUserExperience(expId: number) {
    return this.http.delete(API_URL + "users_experiences/" + expId, {
    });
  }

  deleteExperience(expId: number) {
    return this.http.delete(API_URL + "experiences/" + expId, {
    });
  }
}
