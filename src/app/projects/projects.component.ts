import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Project } from "../models/projects";
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  providers: [HttpService],
  styleUrls: ["./projects.component.less"]
})
export class ProjectsComponent implements OnInit {
  projects;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
      this.httpService.getProjects().subscribe(data => this.projects = data);
  }

}
