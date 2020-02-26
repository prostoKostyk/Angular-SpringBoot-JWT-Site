import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Project } from "src/app/models/projects";
import { User } from "src/app/models/users";
@Component({
  selector: "app-user-projects",
  templateUrl: "./user-projects.component.html",
  providers: [HttpService],
  styleUrls: ["./user-projects.component.less"]
})
export class UserProjectsComponent implements OnInit {
  users: Array<User>;
  usersToProject = [];
  usersToProjectString: string;
  addUserValue: string;
  projects: Array<Project>; // все проекты
  userProjects: Array<Project>; // проекты, принадлежащие данному пользователю
  showingProjects: Array<Project>; // проекты, которые будут показываться в зависимости от поиска и т.д.
  projectChangeMode = false;
  projectChangeId: number;
  addMode = false;
  myForm: FormGroup;
  searchWord: string;
  searchMessage: string;
  filterValue = "1";
  showApproved = true;
  showNotApproved = true;
  constructor(public httpService: HttpService) {
    this.myForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "cost": new FormControl("", [Validators.required]),
      "timeLimitMonths": new FormControl("", [Validators.required]),
      "target": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.httpService.getProjects().subscribe(data => {
      this.projects = data;
      this.userProjects = [this.projects[1], this.projects[2], this.projects[3]];
      this.showingProjects = this.userProjects;
    });
    this.httpService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  change(id: number): void {
    this.projectChangeId = id;
    this.myForm.setValue({
      name: this.showingProjects[this.projectChangeId].name,
      cost: this.showingProjects[this.projectChangeId].cost,
      timeLimitMonths: this.showingProjects[this.projectChangeId].timeLimitMonths,
      target: this.showingProjects[this.projectChangeId].target,
      description: this.showingProjects[this.projectChangeId].description
    });
  }

  save(name: string, cost: number, timeLimitMonths: number, target: string, description: string): void {
    for (const project of this.userProjects) {
      if (project.name === this.showingProjects[this.projectChangeId].name) {
        project.name = name;
        project.cost = cost;
        project.timeLimitMonths = timeLimitMonths;
        project.target = target;
        project.description = description;
        this.showingProjects[this.projectChangeId] = project;
        this.projectChangeId = null;
      }
    }
    this.myForm.setValue({
      name: "",
      cost: "",
      timeLimitMonths: "",
      target: "",
      description: ""
    });
  }

  addProject(name: string, cost: number, timeLimitMonths: number, target: string, description: string): void {
    this.userProjects.push(new Project(name, target, description, timeLimitMonths, cost, false));
    this.showingProjects = this.userProjects;
    this.addMode = !this.addMode;
  }
  addUserToProject(): string {
    for (const existingUser of this.usersToProject) {
      if (existingUser === this.addUserValue) {
        return "";
      }
    }
    this.usersToProject.push(this.addUserValue);
    this.usersToProjectString = this.usersToProject.join(", ");
  }
  getProjectStatus(id: number): object {
    if (this.showingProjects[id].approved) {
      return { status: "Одобрен", image: "/assets/images/ok.png" };
    } else {
      return { status: "На расмотрении", image: "/assets/images/load.png" };
    }
  }

  search() {
    this.showingProjects = [];
    for (const project of this.userProjects) {
      if (project.name.indexOf(this.searchWord) + 1) {
        this.showingProjects.push(project);
      }
    }
    if (this.showingProjects.length > 4 || this.showingProjects.length === 0) {
      this.searchMessage = "Найдено " + this.showingProjects.length + " проектов";
    } else if (this.showingProjects.length === 1) {
      this.searchMessage = "Найден 1 проект";
    } else {
      this.searchMessage = "Найдено " + this.showingProjects.length + " проекта";
    }
  }

  cancelSearch() {
    this.showingProjects = this.userProjects;
    this.searchMessage = "";
    this.searchWord = "";
  }

  filter() {
    if (this.filterValue === "1") {
      this.showApproved = true;
      this.showNotApproved = true;
    } else if (this.filterValue === "2") {
      this.showApproved = true;
      this.showNotApproved = false;
    } else {
      this.showApproved = false;
      this.showNotApproved = true;
    }
  }
}
