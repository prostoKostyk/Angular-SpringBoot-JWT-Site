import { Component, OnInit } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { HttpService } from "../http.service";
import { Project } from "../models/projects";
import { ProjectsService } from "../_services/projects.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { UserService } from "../_services/user.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  providers: [HttpService],
  styleUrls: ["./project.component.less"]
})
export class ProjectComponent implements OnInit {
  private project;
  private projectid: number;
  errorMessage = "";
  userId: number;
  user;
  userAdmin = false;
  private subscription: Subscription;
  constructor(public userService: UserService, private activateRoute: ActivatedRoute, private projectsService: ProjectsService,
              public tokenStorage: TokenStorageService) {
    this.subscription = activateRoute.params.subscribe(params => this.projectid = params.id);
  }

  ngOnInit() {
    this.projectsService.getProject(this.projectid).subscribe(
      data => {
        this.project = data;
      }
    );
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

approveProject(approved: boolean): void {
  this.project.approved = approved;
  this.projectsService.updateProject(this.project, this.projectid).subscribe();
}
}
