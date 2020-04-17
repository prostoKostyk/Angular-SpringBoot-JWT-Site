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

  /**
   * Метод для отправки запроса для получения всех проектов
   */
  getProjects(): Observable<any> {
    return this.http.get(API_URL + "projects");
  }

  /**
   * Метод для отправки запроса для получения проекта по id
   */
  getProject(id): Observable<any> {
    return this.http.get(API_URL + "project/" + id);
  }

  /**
   * Метод для отправки запроса для получения всех проектов пользователя
   */
  getUserProject(userId): Observable<any> {
    return this.http.get(API_URL + "users/getprojects/" + userId);
  }

  /**
   * Метод для отправки запроса для получения пагинированного списка проектов
   */
  getPaginateProjects(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    return this.http.get(API_URL + "projects/pagination/" + pageNo + "/" + pageSize + "/" + sortBy);
  }

  /**
   * Метод для отправки запроса для поиска проектов по имени и получения пагинированного списка
   */
  getFindProjectsByName(pageNo: number, pageSize: number, sortBy: string, name: string, approved?: boolean): Observable<any> {
    // если approved указан
    if (arguments.length === 5) {
      return this.http.get(API_URL + "projectfindbyname/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + name + "/" + approved);
    } else { // если approved не указан
      return this.http.get(API_URL + "projectfindbyname/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + name);
    }
  }

  /**
   * Метод для отправки запроса для поиска проектов по approved и получения пагинированного списка
   */
  getFindProjectsByApproved(pageNo: number, pageSize: number, sortBy: string, approved: boolean): Observable<any> {
    return this.http.get(API_URL + "projectfindbyapproved/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + approved);
  }

  /**
   * Метод для отправки запроса для поиска проектов по пользователю и получения пагинированного списка
   */
  getFindProjectsByUser(pageNo: number, pageSize: number, sortBy: string, userId: number): Observable<any> {
    return this.http.get(API_URL + "projectfindbyuser/" + pageNo + "/" + pageSize + "/" + sortBy + "/" + userId);
  }

  /**
   * Метод для отправки запроса для поиска проектов по пользователю и approved и получения пагинированного списка
   */
  getFindProjectsByUserAndApproved(pageNo: number, pageSize: number, sortBy: string, userId: number, approved: boolean): Observable<any> {
    return this.http.get(API_URL + "projectfindbyuserandapproved/" + pageNo + "/" + pageSize
      + "/" + sortBy + "/" + userId + "/" + approved);
  }

  /**
   * Метод для отправки запроса для поиска проектов по пользователю и названию и получения пагинированного списка
   */
  getFindProjectsByUserAndName(pageNo: number, pageSize: number, sortBy: string, userId: number, name: string): Observable<any> {
    return this.http.get(API_URL + "projectfindbyuserandname/" + pageNo + "/" + pageSize
      + "/" + sortBy + "/" + userId + "/" + name);
  }

  /**
   * Метод для отправки запроса для создания проекта и его добавления пользователю
   */
  setProject(project, userId) {
    return this.http.put(API_URL + "users/add_project/" + userId, {
      name: project.name,
      target: project.target,
      description: project.description,
      timelimitmonths: project.timelimitmonths,
      cost: project.cost,
      approved: false,
    }, httpOptions);
  }

  /**
   * Метод для отправки запроса для добавления пользователю существующего проекта
   */
  addExistProject(project, userId) {
    return this.http.put(API_URL + "users/add_existing_project/" + userId, {
      id: project.id,
      name: project.name,
      target: project.target,
      description: project.description,
      timelimitmonths: project.timelimitmonths,
      cost: project.cost,
      approved: project.approved,
    }, httpOptions);
  }

  /**
   * Метод для отправки запроса для изменения проекта
   */
  updateProject(project, projectId) {
    return this.http.put(API_URL + "projects/" + projectId, {
      name: project.name,
      target: project.target,
      description: project.description,
      timelimitmonths: project.timelimitmonths,
      cost: project.cost,
      approved: project.approved
    }, httpOptions);
  }
}
