import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalVariable } from "../_helpers/variables.service";

const API_URL = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

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

  getUserProject(userId): Observable<any> {
    return this.http.get(API_URL + "users/getProjects/" + userId);
  }

  getPaginateProjects(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    return this.http.get(API_URL + "projects/pagination/" + pageNo + "/" + pageSize + "/" + sortBy);
  }

  getFindProjectsByName(pageNo: number, pageSize: number, sortBy: string, name: string, approved?: boolean): Observable<any> {
    if (arguments.length === 5) {
      return this.http.get(API_URL + "projectfindbyname/" + pageNo + "/" + pageSize  + "/" + sortBy + "/" + name + "/" + approved);
    } else {
      return this.http.get(API_URL + "projectfindbyname/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + name);
    }
  }

  getFindProjectsByApproved(pageNo: number, pageSize: number, sortBy: string, approved: boolean): Observable<any> {
    return this.http.get(API_URL + "projectfindbyapproved/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + approved );
  }

  getFindProjectsByUser(pageNo: number, pageSize: number, sortBy: string, userId: number): Observable<any> {
      return this.http.get(API_URL + "projectfindbyuser/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + userId);
  }

  getFindProjectsByUserAndApproved(pageNo: number, pageSize: number, sortBy: string, userId: number, approved: boolean): Observable<any> {
    return this.http.get(API_URL + "projectfindbyuserandapproved/" + pageNo + "/" + pageSize
                         + "/" + sortBy + "/" + userId + "/" + approved);
  }

  getFindProjectsByUserAndName(pageNo: number, pageSize: number, sortBy: string, userId: number, name: string): Observable<any> {
    return this.http.get(API_URL + "projectfindbyuserandname/" + pageNo + "/" + pageSize
                         + "/" + sortBy + "/" + userId + "/" + name);
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
