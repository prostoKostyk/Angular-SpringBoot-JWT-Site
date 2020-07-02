import { Component, HostListener, OnInit } from "@angular/core";
import { UserProjectsComponent } from "src/app/components/cabinet/user-projects/user-projects.component";
import { CompaniesService } from "../../_services/companies.service";
import { ProjectsService } from "../../_services/projects.service";
import { TokenStorageService } from "../../_services/token-storage.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.less"]
})

export class ProjectsComponent extends UserProjectsComponent implements OnInit {
  userAdmin = false;

  findedProjects = [];
  findedProjectsLength = 0;

  showingProjects = [];
  showingProjectsLength = 0;

  pageSize = 10;

  constructor(public tokenStorage: TokenStorageService, public projectsService: ProjectsService,
              public userService: UserService, public companiesService: CompaniesService) {
    super(userService, projectsService, tokenStorage, companiesService);
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.curentUserId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.curentUserId).subscribe(
        userData => {
          this.curentUser = userData;
          for (const role of this.curentUser.roles) {
            if (role.name === "ROLE_ADMIN") {
              this.userAdmin = true;
            }
          }
          this.getPaginateProjects();
        }
      );
    } else {
      this.getPaginateProjects();
    }
  }

  /**
   * Метод для вызова метода getPaginateProjects при скролле
   */
  @HostListener("window:scroll", [])
  onScroll(): void {
    this.paginLoad();
  }

  /**
   * Метод для получения пагинированного списка пользователей и их добавления
   * в массив загруженных до этого пользователей
   */
  getPaginateProjects() {
    // если пользователь не администатор или не авторизирован получаем только одобренные проекты
    if (!this.userAdmin) {
    this.projectService.getFindProjectsByApproved(this.currentPage, this.pageSize, this.sortingValue, true).subscribe(
      projectData => {
        for (const project of projectData.content) {
          if (!this.projects.includes(project)) {
            this.projects.push(project);
          }
        }
        this.showingProjects = this.projects;
        this.projectsLength = projectData.totalElements;
        this.showingProjectsLength = this.projectsLength;
      }
    );
    // если пользователь администатор получаем все проекты
    } else {
      this.projectService.getPaginateProjects(this.currentPage, this.pageSize, this.sortingValue).subscribe(
        projectData => {
          for (const project of projectData.content) {
            if (!this.projects.includes(project)) {
              this.projects.push(project);
            }
          }
          this.showingProjects = this.projects;
          this.projectsLength = projectData.totalElements;
          this.showingProjectsLength = this.projectsLength;
        }
      );
    }
  }

  /**
   * Метод для поиска проектов
   */
  findProjects(click: boolean) {
    if (click) {
      this.cancelGroup();
      this.currentPage = 0;
      this.findedProjects = [];
      this.findedProjectsLength = 0;
    }
    if (this.userAdmin && this.approvedSelectValue === "1") {
      this.projectService.getFindProjectsByName(this.currentPage, this.pageSize, this.sortingValue, this.searchWord)
        .subscribe(
          projectData => {
            for (const project of projectData.content) {
              this.findedProjects.push(project);
            }
            this.findedProjectsLength = projectData.totalElements;
            this.getSearchMessage();
          }
        );
    } else {
      this.projectService.getFindProjectsByName(this.currentPage, this.pageSize, this.sortingValue, this.searchWord, true)
        .subscribe(
          projectData => {
            for (const project of projectData.content) {
              this.findedProjects.push(project);
            }
            this.findedProjectsLength = projectData.totalElements;
            this.getSearchMessage();
          }
        );
    }
  }

  /**
   * Метод для получения сообщения о найденных проектах
   */
  getSearchMessage() {
    if (this.findedProjectsLength > 4 || this.findedProjectsLength === 0) {
      this.searchMessage = "Найдено " + this.findedProjectsLength + " проектов";
    } else if (this.findedProjectsLength === 1) {
      this.searchMessage = "Найден 1 проект";
    } else {
      this.searchMessage = "Найдено " + this.findedProjectsLength + " проекта";
    }
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
    this.projectService.getFindProjectsByApproved(this.currentPage, this.pageSize,
                                                  this.sortingValue, onlyNotApproved).subscribe(
        projectData => {
          for (const project of projectData.content) {
            this.showingProjects.push(project);
          }
          this.showingProjectsLength = projectData.totalElements;
        }
      );
  }

  /**
   * Метод для отмены поиска проектов
   */
  cancelSearch(): void {
    this.currentPage = this.projectsCurrentPage;
    this.searchMessage = "";
    this.searchWord = "";
    this.findedProjects = [];
    this.findedProjectsLength = 0;
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
   * Метод для получения отсортированного списка проектов
   */
  sortChange() {
    this.currentPage = this.projectsCurrentPage;
    this.showingProjects = [];
    this.getPaginateProjects();
  }
}
