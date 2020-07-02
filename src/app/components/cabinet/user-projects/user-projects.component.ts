import { Component, HostListener, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CompaniesService } from "src/app/_services/companies.service";
import { ProjectsService } from "src/app/_services/projects.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";
@Component({
  selector: "app-user-projects",
  templateUrl: "./user-projects.component.html",
  styleUrls: ["./user-projects.component.less"]
})
export class UserProjectsComponent implements OnInit {
  curentUser;
  curentUserId;
  usersToProject = []; // массив пользователей, которые добавляются в новый проек
  addUserId: string; // id пользователя, выбранного в select'e для добавления в новый проект

  projectChangeId: number; // id проекта, который изменяется в данный момент
  newProjectForm: FormGroup;

  userCompany;

  searchWord: string;
  searchMessage = "";

  filterValue = "1";
  approvedSelectValue = "1";

  projectChangeMode: boolean;
  projectAddMode: boolean;

  projects = []; // все проекты
  projectsCurrentPage = 0;
  projectsLength = 0;

  showingProjects = []; // проекты, которые будут показываться в зависимости от поиска и т.д.
  showingProjectsLength = 0;

  currentPage = 0;
  pageSize = 2;

  usersInProjects = {};
  usersInCompany = [];

  sortingValue = "name";

  constructor(public userService: UserService, public projectService: ProjectsService,
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
      this.getPaginateProjects();
      this.companiesService.getUserCompanies(this.curentUserId).subscribe(
        companyData => {
          this.userCompany = companyData[0];
          this.getUsersInCompany();
        }
      );
    }
  }

  /**
   * Метод для вызова метода getPaginateProjects при скролле
   */
  @HostListener("window:scroll", [])
  onScroll(): void {
    this.paginLoad();
  }

  paginLoad(): void {
    // проверяем была ли страница прокручена до конца
    if (((window.innerHeight + window.scrollY * 1.1) >= document.body.scrollHeight)) {
      if (this.currentPage + 1 < this.showingProjectsLength / this.pageSize) {
        this.currentPage++;
        // если страница прокручена, то проверяем был ли использованн поиск
        // по проектам, их группировка или сортировка и в зависимости от этого
        // либо прогружаем любые 10 новвых проектов либо загружаем проекты,
        // подходящие под значение поиска, группировки или сортировки
        if (this.searchMessage === "" && this.approvedSelectValue === "1") {
          this.getPaginateProjects();
          this.projectsCurrentPage = this.currentPage;
        }
        if (this.searchMessage !== "" && this.approvedSelectValue === "1") {
          this.findProjects(false);
        }
        if (this.searchMessage === "" && this.approvedSelectValue !== "1") {
          this.groupByApprove(false);
        }
      }
    }
  }

  /**
   * Метод для получения пагинированного списка пользователей и их добавления
   * в массив загруженных до этого пользователей
   */
  getPaginateProjects() {
    this.projectService.getFindProjectsByUser(this.currentPage, this.pageSize, this.sortingValue, this.curentUserId).subscribe(
      projectData => {
        for (const project of projectData.content) {
          if (!this.projects.includes(project)) {
            this.projects.push(project);
            this.getUsersInProject(project.id);
          }
        }
        this.showingProjects = this.projects;
        this.projectsLength = projectData.totalElements;
        this.showingProjectsLength = this.projectsLength;
      }
    );
  }

  /**
   * Метод для получения пользователей в указанном проекте для вывода их в списке участников проекта
   */
  getUsersInProject(projectId: number) {
    let users = "";
    this.userService.getFindByProject(projectId).subscribe(
      userData => {
        for (const fio of userData.content) {
          users += fio + ", ";
        }
        users = users.substring(0, users.length - 2) + ".";
        this.usersInProjects[projectId] = users;
      }
    );
  }

  /**
   * Метод для получения пользователей в компании текущего пользователя для вывода их в списке
   * для добавления в проект
   */
  getUsersInCompany() {
  this.userService.getFindByCompany(this.userCompany.id).subscribe(
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

  /**
   * Метод для поиска проектов
   */
  findProjects(click: boolean) {
    if (click) {
      this.cancelGroup();
      this.currentPage = 0;
      this.showingProjects = [];
      this.showingProjectsLength = 0;
    }
    this.projectService.getFindProjectsByUserAndName(this.currentPage, this.pageSize, this.sortingValue,
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

  /**
   * Метод для фильтрации проектов по approved
   */
  groupByApprove(click: boolean) {
    let onlyNotApproved: boolean;
    if (click) {
      this.cancelSearch();
      this.currentPage = 0;
      this.showingProjects = [];
      this.showingProjectsLength = 0;
    }
    if (this.approvedSelectValue === "1") {
      this.cancelGroup();
      return;
    }
    if (this.approvedSelectValue === "2") {
      onlyNotApproved = true;
    } else if (this.approvedSelectValue === "3") {
      onlyNotApproved = false;
    }
    this.projectService.getFindProjectsByUserAndApproved(this.currentPage, this.pageSize, this.sortingValue,
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

  /**
   * Метод для отмены фильтрации проектов по approved
   */
  cancelGroup() {
    this.currentPage = this.projectsCurrentPage;
    this.approvedSelectValue = "1";
    this.showingProjects = this.projects;
    this.showingProjectsLength = this.projectsLength;
  }

  /**
   * Метод для отмены поиска проектов
   */
  cancelSearch() {
    this.currentPage = this.projectsCurrentPage;
    this.showingProjects = this.projects;
    this.showingProjectsLength = this.projectsLength;
    this.searchWord = "";
    this.searchMessage = "";
  }

  /**
   * Метод для очистки формы для редактирования проектов
   */
  clearForm() {
    this.newProjectForm.setValue({
      name: "",
      cost: "",
      timelimitmonths: "",
      target: "",
      description: ""
    });
    this.usersToProject = [];
  }

  /**
   * Метод для создания нового проекта и его добавления текущему пользователю, а
   * так же пользователям, указанным в массиве usersToProject
   */
  addProject(): void {
    let project;
    this.projectService.setProject(this.newProjectForm.value, this.curentUserId).subscribe(
      ProjectData => {
        project = ProjectData;
        for (const user of this.usersToProject) {
          if (user.id !== this.curentUserId) {
            this.projectService.addExistProject(project, user.id).subscribe();
          }
        }
        this.clearForm();
        this.getPaginateProjects();
      });
    this.projectAddMode = !this.projectAddMode;
  }

  /**
   * Метод для добавления пользователей в массив usersToProject
   */
  addUserToProjectArray(): string {
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

  /**
   * Метод для удаления пользователя из массива usersToProject
   */
  removeUser(userId): void {
    for (let i = 0; i < this.usersToProject.length; i++) {
      if (this.usersToProject[i].id === userId) {
        this.usersToProject.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Метод для добавления данных изменяемго проекта в projectForm
   */
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

  /**
   * Метод для сохранения данных изменяемой компании
   */
  save(projectId: number, i: number): void {
    this.projectService.updateProject(this.newProjectForm.value, projectId).subscribe(
      projectData => {
          this.showingProjects[i] = projectData;
          this.saveUsersToExistProject(projectData);
          this.clearForm();
      }
    );
    this.projectChangeMode = false;
    this.projectChangeId = null;
  }

  /**
   * Метод для добавления существующего проекта пользователям, указанным при редактировании
   * проекта
   */
  saveUsersToExistProject(project) {
    for (const user of this.usersToProject) {
      if (user.id !== this.curentUserId) {
        this.projectService.addExistProject(project, user.id).subscribe(
          projectData => {
            this.getUsersInProject(project.id);
          }
        );
      }
    }
  }

  /**
   * Метод для получения сообщения о найденных проектах
   */
  getSearchMessage() {
    if (this.showingProjectsLength > 4 || this.showingProjectsLength === 0) {
      this.searchMessage = "Найдено " + this.showingProjectsLength + " проектов";
    } else if (this.showingProjectsLength === 1) {
      this.searchMessage = "Найден 1 проект";
    } else {
      this.searchMessage = "Найдено " + this.showingProjectsLength + " проекта";
    }
  }

  /**
   * Метод для получения статуса проекта (одобрен/на рассмотреннии)
   */
  getProjectStatus(id: number): boolean {
    for (const project of this.showingProjects) {
      if (project.id === id) {
        return (project.approved);
      }
    }
  }
}
