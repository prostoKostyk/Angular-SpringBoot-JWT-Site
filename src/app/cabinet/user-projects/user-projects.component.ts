import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-user-projects",
  templateUrl: "./user-projects.component.html",
  providers: [HttpService],
  styleUrls: ["./user-projects.component.less"]
})
export class UserProjectsComponent implements OnInit {
  projects;
  userProjectsId = [1, 2];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getProjects().subscribe(data => this.projects = data);
  }

}
