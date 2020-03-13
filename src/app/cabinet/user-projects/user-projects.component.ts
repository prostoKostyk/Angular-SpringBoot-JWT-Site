import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Project } from "src/app/models/projects";
import { User } from "src/app/models/users";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";
import { ProjectsService } from "src/app/_services/projects.service";
@Component({
  selector: "app-user-projects",
  templateUrl: "./user-projects.component.html",
  providers: [HttpService],
  styleUrls: ["./user-projects.component.less"]
})
export class UserProjectsComponent implements OnInit {
  users;
  usersToProject = [];
  addUserValue: string;
  projects: Array<Project>; // все проекты
  userProjects: Array<Project>; // проекты, принадлежащие данному пользователю
  showingProjects: Array<Project>; // проекты, которые будут показываться в зависимости от поиска и т.д.
  projectChangeMode: boolean;
  projectChangeId: number;
  addMode: boolean;
  form: FormGroup;
  searchWord: string;
  searchMessage: string;
  filterValue = "1";
  showApproved = true;
  showNotApproved = true;
  userId;
  user;
  errorMessage = "";
  constructor(public httpService: HttpService, public userService: UserService, public projectService: ProjectsService,
              public tokenStorage: TokenStorageService) {
    this.form = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "cost": new FormControl("", [Validators.required]),
      "time_limit_months": new FormControl("", [Validators.required]),
      "target": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.userId).subscribe(
        data => {
          this.user = data;
          this.showingProjects = this.user.projects;
          this.showingProjects.sort((a, b) => a.name > b.name ? 1 : -1);
        }
      );
      this.userService.getUsers().subscribe(
        data => {
          this.users = data;
        }
      );
    }
  }

  addProject(): void {
    let project;
    this.projectService.setProject(this.form.value, this.userId).subscribe(
      data => {
        project = data;
        for (const user of this.usersToProject) {
          if (user.id !== this.userId) {
            this.projectService.addProject(project, user.id).subscribe();
          }
        }
        this.userService.getUser(this.userId).subscribe(
          data2 => {
            this.user = data2;
            this.showingProjects = this.user.projects;
            this.showingProjects.sort((a, b) => a.name > b.name ? 1 : -1);
          });
        this.userService.getUsers().subscribe(
          data2 => {
            this.users = data2;
          });
      });
    this.addMode = !this.addMode;
  }

  addUserToProject(): string {
    for (const user of this.usersToProject) {
      if (user.id === this.addUserValue) {
        return "Пользователь уже добавлен в проект";
      }
    }
    for (const user of this.users.content) {
      if (user.id === +this.addUserValue) {
        this.usersToProject.push({
          id: user.id,
          name: user.second_name + " " + user.first_name + " " + user.last_name
        });
        break;
      }
    }
  }

  removeUser(userId): void {
    for (let i = 0; i < this.usersToProject.length; i++) {
      if (this.usersToProject[i].id === userId) {
        this.usersToProject.splice(i, 1);
        break;
      }
    }
  }

  change(projectId: number): void {
    let project;
    this.projectService.getProject(projectId).subscribe(
      data => {
        project = data;
        this.projectChangeId = project.id;
        this.form.setValue({
          name: project.name,
          cost: project.cost,
          time_limit_months: project.time_limit_months,
          target: project.target,
          description: project.description
        });
        this.projectChangeMode = true;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  save(projectId: number): void {
    this.projectService.updateProject(this.form.value, projectId).subscribe(
      data => {
        this.userService.getUser(this.userId).subscribe(
          data2 => {
            this.user = data2;
            this.showingProjects = this.user.projects;
            this.showingProjects.sort((a, b) => a.name > b.name ? 1 : -1);
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.projectChangeMode = false;
    this.projectChangeId = null;
  }

  search() {
    this.showingProjects = [];
    for (const project of this.user.projects) {
      if (project.name.indexOf(this.searchWord) + 1) {
        this.showingProjects.push(project);
      }
    }
    this.showingProjects.sort((a, b) => a.name > b.name ? 1 : -1);
    if (this.showingProjects.length > 4 || this.showingProjects.length === 0) {
      this.searchMessage = "Найдено " + this.showingProjects.length + " проектов";
    } else if (this.showingProjects.length === 1) {
      this.searchMessage = "Найден 1 проект";
    } else {
      this.searchMessage = "Найдено " + this.showingProjects.length + " проекта";
    }
  }

  cancelSearch() {
    this.showingProjects = this.user.projects;
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

  getProjectStatus(id: number): boolean {
    for (const project of this.user.projects) {
      if (project.id === id) {
        return (project.approved);
      }
    }
  }

  getUsersInProject(projectId: number): string {
    let usersInProject = "";
    for (const user of this.users.content) {
      for (const project of user.projects) {
        if (project.id === projectId) {
          usersInProject += user.second_name + " " + user.first_name + " " + user.last_name + ", ";
          break;
        }
      }
    }
    return usersInProject;
  }
}
