import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { HttpService } from "../http.service";
import { ProjectsService } from "../_services/projects.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { UserService } from "../_services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  providers: [HttpService],
  styleUrls: ["./project.component.less"]
})
export class ProjectComponent implements OnInit {
  project;
  projectid: number;

  user;
  users;
  userId: number;
  usersInProject = [];
  userAdmin = false;

  subscription: Subscription;

  constructor(public userService: UserService, private activateRoute: ActivatedRoute, private projectsService: ProjectsService,
              public tokenStorage: TokenStorageService, private router: Router) {
    this.subscription = activateRoute.params.subscribe(params => this.projectid = params.id);
  }

  ngOnInit() {
    this.projectsService.getProject(this.projectid).subscribe(
      projectData => {
        this.project = projectData;
        this.userService.getUsers().subscribe(
          allUsersData => {
            this.users = allUsersData;
            this.getUsersInProject();
          }
        );
        if (this.tokenStorage.getToken()) {
          this.userId = this.tokenStorage.getUser().id;
          this.userService.getUser(this.userId).subscribe(
            data3 => {
              this.user = data3;
              for (const role of this.user.roles) {
                if (role.name === "ROLE_ADMIN") {
                  this.userAdmin = true;
                }
              }
            }
          );
        }
      });
  }

  approveProject(approved: boolean): void {
    this.project.approved = approved;
    this.projectsService.updateProject(this.project, this.projectid).subscribe();
  }

  getUsersInProject(): void {
    for (const user of this.users.content) {
      for (const project of user.projects) {
        if (project.id.toString() === this.projectid) {
          this.usersInProject.push({
            id: user.id,
            name: user.secondName + " " + user.firstName + " " + user.lastName
          });
          break;
        }
      }
    }
  }

  getUserInfo(userId: number) {
    this.router.navigate(["projects/project/" + this.projectid + "/user/" + userId.toString()]);
  }
}
