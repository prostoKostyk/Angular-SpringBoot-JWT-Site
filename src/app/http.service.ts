import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Project } from "./models/projects";
import { User } from "./models/users";
@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        return this.http.get("assets/projects.json").pipe(map(data => {
            const projectKey = "projects";
            const projects = data[projectKey];
            return projects.map(function f(project: Project): object {
                const obj: object = {
                    name: project.name,
                    target: project.target,
                    description: project.description,
                    timeLimitMonths: project.timeLimitMonths,
                    cost: project.cost,
                    approved: project.approved };
                return obj;
              });
        }));
    }
    getUsers(): Observable<User[]> {
        return this.http.get("assets/users.json").pipe(map(data => {
            const userKey = "users";
            const users = data[userKey];
            return users.map(function f(user: User): object {
                const obj: object = {
                    id: user.id,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    password: user.password,
                    userType: user.userType};
                return obj;
              });
        }));
    }
    }
