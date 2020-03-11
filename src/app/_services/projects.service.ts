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
export class ProjectsService {
  constructor(private http: HttpClient) { }
  getProjects(): Observable<any> {
    return this.http.get(API_URL + "projects");
  }
  getProject(id): Observable<any> {
    return this.http.get(API_URL + "project/" + id);
  }

  setProject(project, userId) {
    return this.http.put(API_URL + "users/add_project/" + userId, {
      name: project.name,
      target: project.target,
      description: project.description,
      time_limit_months: project.time_limit_months,
      cost: project.cost,
      approved: false,
    }, httpOptions);
  }

  addProject(project, userId) {
    return this.http.put(API_URL + "users/add_existing_project/" + userId, {
      id: project.id,
      name: project.name,
      target: project.target,
      description: project.description,
      time_limit_months: project.time_limit_months,
      cost: project.cost,
      approved: project.approved,
    }, httpOptions);
  }

  updateProject(project, projectId) {
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
