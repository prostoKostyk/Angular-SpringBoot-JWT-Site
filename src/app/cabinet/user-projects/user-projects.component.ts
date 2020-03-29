import { Component, HostListener, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "src/app/http.service";
import { Project } from "src/app/models/projects";
import { CompaniesService } from "src/app/_services/companies.service";
import { ProjectsService } from "src/app/_services/projects.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";
@Component({
  selector: "app-user-projects",
  templateUrl: "./user-projects.component.html",
  providers: [HttpService],
  styleUrls: ["./user-projects.component.less"]
})
export class UserProjectsComponent implements OnInit {
  curentUser;
  curentUserId;
  usersToProject = []; // массив пользователей, которые добавляются в новый проек
  addUserId: string; // id пользователя, выбранного в select'e для добавления в новый проект
  userProjects: Array<Project>; // проекты, принадлежащие данному пользователю

  projectChangeId: number; // id проекта, который изменяется в данный момент
  newProjectForm: FormGroup;

  userCompany;

  searchWord: string;
  searchMessage = "";

  filterValue = "1";
  onlyNotApproved = "1";

  projectChangeMode: boolean;
  projectAddMode: boolean;

  showingProjects = []; // проекты, которые будут показываться в зависимости от поиска и т.д.
  showingProjectsLength = 0;

  projects = []; // все проекты
  projectsCurrentPage = 0;
  projectsLength = 0;

  currentPage = 0;
  pageSize = 2;

  usersInProjects = {};
  usersInCompany = [];

  constructor(public httpService: HttpService, public userService: UserService, public projectService: ProjectsService,
              public tokenStorage: TokenStorageService, public companiesService: CompaniesService) {
    this.newProjectForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "cost": new FormControl("", [Validators.required]),
      "timelimitmonths": new FormControl("", [Validators.required]),
      "target": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.curentUserId = this.tokenStorage.getUser().id;
      this.getPaginProjects();
      this.companiesService.getUserCompanies(this.curentUserId).subscribe(
        companyData => {
          this.userCompany = companyData[0];
          this.getUsersInCompany(this.userCompany.id);
        }
      );
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (((window.innerHeight + window.scrollY * 1.1) >= document.body.scrollHeight)) {
      if (this.currentPage + 1 < this.showingProjectsLength / this.pageSize) {
        this.currentPage++;
        if (this.searchMessage === "" && this.onlyNotApproved === "1") {
        this.projectsCurrentPage = this.currentPage;
        this.getPaginProjects();
        }
        if (this.searchMessage !== "" && this.onlyNotApproved === "1") {
          this.findProjects(false);
        }
        if (this.searchMessage === "" && this.onlyNotApproved !== "1") {
          this.groupByApprove(false);
        }
      }
    }
  }

  getPaginProjects() {
    this.projectService.getFindProjectsByUser(this.currentPage, this.pageSize, "name", this.curentUserId).subscribe(
      projectData => {
        console.log(projectData);
        for (const project of projectData.content) {
          this.projects.push(project);
          this.getUsersInProject(project.id);
        }
        this.showingProjects = this.projects;
        this.projectsLength = projectData.totalElements;
        this.showingProjectsLength = this.projectsLength;
      }
    );
  }

  getUsersInProject(projectId: number) {
    let users = "";
    if (this.usersInProjects[projectId]) {
      return;
    }
    this.userService.getFindByProject(projectId).subscribe(
      userData => {
        for (const fio of userData.content) {
          users += fio + ", ";
        }
        this.usersInProjects[projectId] = users;
      }
    );
  }

  getUsersInCompany(companyId: number) {
  this.userService.getFindByCompany(companyId).subscribe(
    userData => {
      for (const user of userData.content) {
        this.usersInCompany.push(
          {id: user.id,
           firstname: user.firstname,
           secondname: user.secondname,
           lastname: user.lastname,
        });
      }
    });
  }

  findProjects(click: boolean) {
    if (click) {
      this.cancelGroup();
      this.currentPage = 0;
      this.showingProjects = [];
      this.showingProjectsLength = 0;
    }
    this.projectService.getFindProjectsByUserAndName(this.currentPage, this.pageSize, "name",
                                                     this.curentUserId, this.searchWord)
      .subscribe(
        projectData => {
          for (const project of projectData.content) {
            this.showingProjects.push(project);
            this.getUsersInProject(project.id);
          }
          this.showingProjectsLength = projectData.totalElements;
          this.getSearchMessage();
        }
      );
  }

  groupByApprove(click: boolean) {
    let onlyNotApproved: boolean;
    if (click) {
      this.cancelSearch();
      this.currentPage = 0;
      this.showingProjects = [];
      this.showingProjectsLength = 0;
    }
    if (this.onlyNotApproved === "1") {
      this.cancelGroup();
      return;
    }
    if (this.onlyNotApproved === "2") {
      onlyNotApproved = true;
    } else if (this.onlyNotApproved === "3") {
      onlyNotApproved = false;
    }
    this.projectService.getFindProjectsByUserAndApproved(this.currentPage, this.pageSize, "name",
                                                         this.curentUserId, onlyNotApproved).subscribe(
      projectData => {
        for (const project of projectData.content) {
          this.showingProjects.push(project);
          this.getUsersInProject(project.id);
        }
        this.showingProjectsLength = projectData.totalElements;
      }
    );
  }

  cancelGroup() {
    this.currentPage = this.projectsCurrentPage;
    this.showingProjects = this.projects;
    this.showingProjectsLength = this.projectsLength;
    this.onlyNotApproved = "1";
  }

  cancelSearch() {
    this.currentPage = this.projectsCurrentPage;
    this.showingProjects = this.projects;
    this.showingProjectsLength = this.projectsLength;
    this.searchWord = "";
    this.searchMessage = "";
  }

  clearForm() {
    this.newProjectForm.setValue({
      name: "",
      cost: "",
      timelimitmonths: "",
      target: "",
      description: ""
    });
  }

  addProject(): void {
    let project;
    this.projectService.setProject(this.newProjectForm.value, this.curentUserId).subscribe(
      newProjectData => {
        project = newProjectData;
        for (const user of this.usersToProject) {
          if (user.id !== this.curentUserId) {
            this.projectService.addProject(project, user.id).subscribe();
          }
        }
      });
    this.projectAddMode = !this.projectAddMode;
  }

  addUserToProject(): string {
    for (const user of this.usersToProject) {
      if (user.id === this.addUserId) {
        return "Пользователь уже добавлен в проект";
      }
    }
    for (const user of this.usersInCompany) {
      if (user.id === +this.addUserId) {
        this.usersToProject.push({
          id: user.id,
          name: user.secondname + " " + user.firstname + " " + user.lastname
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
        this.newProjectForm.setValue({
          name: project.name,
          cost: project.cost,
          timelimitmonths: project.timelimitmonths,
          target: project.target,
          description: project.description
        });
        this.projectChangeMode = true;
      }
    );
  }

  save(projectId: number): void {
    this.projectService.updateProject(this.newProjectForm.value, projectId).subscribe(
      data => {
        this.projectService.getUserProject(this.curentUserId).subscribe(
          projectData => {
            this.showingProjects = projectData;
            this.showingProjects.sort((a, b) => a.name > b.name ? 1 : -1);
            this.clearForm();
          }
        );
      }
    );
    this.projectChangeMode = false;
    this.projectChangeId = null;
  }

  getSearchMessage() {
    if (this.showingProjectsLength > 4 || this.showingProjectsLength === 0) {
      this.searchMessage = "Найдено " + this.showingProjectsLength + " проектов";
    } else if (this.showingProjectsLength === 1) {
      this.searchMessage = "Найден 1 проект";
    } else {
      this.searchMessage = "Найдено " + this.showingProjectsLength + " проекта";
    }
  }

  getProjectStatus(id: number): boolean {
    for (const project of this.showingProjects) {
      if (project.id === id) {
        return (project.approved);
      }
    }
  }
}
