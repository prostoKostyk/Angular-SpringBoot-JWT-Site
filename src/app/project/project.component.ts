import { Component, OnInit } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { HttpService } from "../http.service";
import { Project } from "../models/projects";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  providers: [HttpService],
  styleUrls: ["./project.component.less"]
})
export class ProjectComponent implements OnInit {
  private projects;
  private id;
  private subscription: Subscription;
  constructor(private httpService: HttpService, private activateRoute: ActivatedRoute) {
      // tslint:disable-next-line:no-string-literal
      this.subscription = activateRoute.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit() {
    this.httpService.getProjects().subscribe(data => this.projects = data);
}
}
