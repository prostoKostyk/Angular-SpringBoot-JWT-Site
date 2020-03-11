import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { UserProjectsComponent } from "src/app/cabinet/user-projects/user-projects.component";
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
  sortingValue = "1";
  userId: number;
  userAdmin = false;
  onlyNotApproved = "1";
  // tslint:disable-next-line:max-line-length
  constructor(public httpService: HttpService, public userService: UserService, public projectsService: ProjectsService, public tokenStorage: TokenStorageService) {
    super(httpService, userService, projectsService, tokenStorage);
  }

  ngOnInit() {
    if (this.projectsService.getProjects()) {
      this.projectsService.getProjects().subscribe(
        data => {
          this.projects = data.content;
          this.showingProjects = data.content;
        }
      );
    }
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.userId).subscribe(
        data => {
          this.user = data;
          for (const role of this.user.roles) {
            if (role.name === "ROLE_ADMIN") {
              this.userAdmin = true;
            }
          }
        }
      );
    }
  }

  search() {
    this.showingProjects = [];
    for (const project of this.projects) {
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

  onlyNotApprovedChange(approved: boolean): void {
    if (this.onlyNotApproved === "1") {
      this.showingProjects = this.projects;
      return;
    } else {
      this.showingProjects = [];
      if (this.onlyNotApproved === "2") {
      for (const project of this.projects) {
        if (project.approved) {
          this.showingProjects.push(project);
        }
      }
      return;
    } else if (this.onlyNotApproved === "3") {
      for (const project of this.projects) {
        if (!project.approved) {
          this.showingProjects.push(project);
        }
      }
    }
    }
  }

cancelSearch(): void {
  this.showingProjects = this.projects;
  this.searchMessage = "";
  this.searchWord = "";
}

sorting(): void {
  if (this.sortingValue === "1") {
  this.showingProjects.sort((a, b) => a.name < b.name ? 1 : -1);
} else if (this.sortingValue === "2") {
  this.showingProjects.sort((a, b) => a.cost > b.cost ? -1 : 1);
} else if (this.sortingValue === "3") {
  this.showingProjects.sort((a, b) => a.timeLimitMonths > b.timeLimitMonths ? -1 : 1);
}
  }
}
