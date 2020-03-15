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

  updateExperience(project, projectId) {
    return this.http.put(API_URL + "projects/" + projectId, {
      name: project.name,
      target: project.target,
      description: project.description,
      time_limit_months: project.time_limit_months,
      cost: project.cost,
      approved: project.approved
    }, httpOptions);
  }
}
