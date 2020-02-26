import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { UserProjectsComponent } from "src/app/cabinet/user-projects/user-projects.component";
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  providers: [HttpService],
  styleUrls: ["./projects.component.less"]
})

export class ProjectsComponent extends UserProjectsComponent implements OnInit {
  sortingValue = "1";

  constructor(public httpService: HttpService) {
    super(httpService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.httpService.getProjects().subscribe(data => {
      this.projects = data;
      this.showingProjects = this.projects;
    });
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
  cancelSearch(): void {
    super.cancelSearch();
    this.showingProjects = this.projects;
  }

  sorting(): void {
    if (this.sortingValue === "1") {
      this.showingProjects.sort((a, b) => a.name > b.name ? 1 : -1);
    } else if (this.sortingValue === "2") {
      this.showingProjects.sort((a, b) => a.cost > b.cost ? -1 : 1);
    } else if (this.sortingValue === "3") {
      this.showingProjects.sort((a, b) => a.timeLimitMonths > b.timeLimitMonths ? -1 : 1);
    }
  }
}
