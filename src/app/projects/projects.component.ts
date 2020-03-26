import { Component, HostListener, OnInit } from "@angular/core";
import { UserProjectsComponent } from "src/app/cabinet/user-projects/user-projects.component";
import { HttpService } from "../http.service";
import { CompaniesService } from "../_services/companies.service";
import { ProjectsService } from "../_services/projects.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { UserService } from "../_services/user.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  providers: [HttpService],
  styleUrls: ["./projects.component.less"]
})

export class ProjectsComponent extends UserProjectsComponent implements OnInit {

  userId: number;
  userAdmin = false;

  findedProjects = [];
  findedProjectsLength = 0;

  groupedProjects = [];
  groupedProjectsLength = 0;

  sortingValue = "name";
  onlyNotApproved = "1";

  currentPage = 0;
  currentPageAll = 0;
  projectsLength = 0;
  pageSize = 10;

  constructor(public httpService: HttpService, public tokenStorage: TokenStorageService,
              public projectsService: ProjectsService,
              public userService: UserService, public companiesService: CompaniesService) {
    super(httpService, userService, projectsService, tokenStorage, companiesService);
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.userId).subscribe(
        userData => {
          this.curentUser = userData;
          for (const role of this.curentUser.roles) {
            if (role.name === "ROLE_ADMIN") {
              this.userAdmin = true;
            }
          }
          this.getPaginateProjects(this.currentPage, this.pageSize, this.sortingValue, this.userAdmin);
        }
      );
    } else {
      this.getPaginateProjects(this.currentPage, this.pageSize, this.sortingValue, this.userAdmin);
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (((window.innerHeight + window.scrollY * 1.1) >= document.body.scrollHeight)) {
      if (this.currentPage + 1 < this.projectsLength / this.pageSize) {
        this.currentPage++;
        if (this.searchMessage === "" && this.onlyNotApproved === "1") {
          this.getPaginateProjects(this.currentPage, this.pageSize, this.sortingValue, this.userAdmin);
          this.currentPageAll = this.currentPage;
        } else if (this.searchMessage !== "" && this.onlyNotApproved === "1") {
          this.findProjects(false);
        } else if (this.onlyNotApproved !== "1") {
          this.group(false);
        }
      }
    }
  }

  getPaginateProjects(pageNo: number, pageSize: number, sortBy: string, admin?: boolean) {
    // если пользователь не администатор или не авторизирован получаем только одобренные проекты
    if (!admin) {
    this.projectService.getFindProjectsByApproved(pageNo, pageSize, sortBy, true).subscribe(
      projectData => {
        for (const project of projectData.content) {
          this.showingProjects.push(project);
        }
        this.projectsLength = projectData.totalElements;
      }
    );
    // если пользователь администатор получаем все проекты
    } else {
      this.projectService.getPaginateProjects(pageNo, pageSize, sortBy).subscribe(
        projectData => {
          for (const project of projectData.content) {
            this.showingProjects.push(project);
          }
          this.projectsLength = projectData.totalElements;
        }
      );
    }
  }

  findProjects(click: boolean) {
    if (click) {
      this.cancelGroup();
      this.currentPage = 0;
      this.findedProjects = [];
      this.findedProjectsLength = 0;
    }

    if (this.userAdmin && this.onlyNotApproved === "1") {
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

  getSearchMessage() {
    if (this.findedProjectsLength > 4 || this.findedProjectsLength === 0) {
      this.searchMessage = "Найдено " + this.findedProjectsLength + " проектов";
    } else if (this.findedProjectsLength === 1) {
      this.searchMessage = "Найден 1 проект";
    } else {
      this.searchMessage = "Найдено " + this.findedProjectsLength + " проекта";
    }
  }

  group(click: boolean) {
    let onlyNotApproved: boolean;
    if (click) {
      this.cancelSearch();
      this.currentPage = 0;
      this.groupedProjects = [];
      this.groupedProjectsLength = 0;
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
    this.projectService.getFindProjectsByApproved(this.currentPage, this.pageSize, this.sortingValue, onlyNotApproved)
      .subscribe(
        projectData => {
          for (const project of projectData.content) {
            this.groupedProjects.push(project);
          }
          this.groupedProjectsLength = projectData.totalElements;
        }
      );
  }

  cancelSearch(): void {
    this.currentPage = this.currentPageAll;
    this.searchMessage = "";
    this.searchWord = "";
    this.findedProjects = [];
    this.findedProjectsLength = 0;
  }

  cancelGroup() {
    this.currentPage = this.currentPageAll;
    this.onlyNotApproved = "1";
    this.groupedProjects = [];
    this.groupedProjectsLength = 0;
  }

  sortChange() {
    this.currentPage = this.currentPageAll;
    this.showingProjects = [];
    this.getPaginateProjects(this.currentPage, this.pageSize, this.sortingValue, this.userAdmin);
  }
}
