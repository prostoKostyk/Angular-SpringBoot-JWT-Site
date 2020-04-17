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

  /**
   * Метод для отправки запроса для получения всех записей опыта
   * работы пользователя
   */
  getUserExperiences(userId: number): Observable<any> {
    return this.http.get(API_URL + "experience_user/" + userId);
  }

  /**
   * Метод для отправки запроса для добавления записи опыта
   * работы пользователя
   */
  addExperience(experience, currentUser) {
    return this.http.post(API_URL + "experiences", {
      company: experience.company,
      position: experience.position,
      beginningdate: experience.beginningdate,
      enddate: experience.enddate,
      experience_months: experience.experiencemonths,
      user: currentUser
    }, httpOptions);
  }

  /**
   * Метод для отправки запроса для удаления записи опыта
   * работы пользователя
   */
  deleteExperience(expId: number) {
    return this.http.delete(API_URL + "experiences/" + expId, {
    });
  }
}
