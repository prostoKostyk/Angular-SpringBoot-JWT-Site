import { Component, OnInit } from "@angular/core";
import { ExperienceService } from "../../_services/experience.service";
import { UserComponent } from "../cabinet/user/user.component";
import { UserService } from "../../_services/user.service";
import { TokenStorageService } from "../../_services/token-storage.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.less"]
})
export class UserInfoComponent extends UserComponent implements OnInit {
  userId: number;

  userAdmin = false;

  subscription: Subscription;

  constructor(public userService: UserService, public tokenStorage: TokenStorageService,
              public experienceService: ExperienceService, private activateRoute: ActivatedRoute, ) {
    super(userService, tokenStorage, experienceService);
    this.subscription = activateRoute.params.subscribe(params => this.userId = params.userid);
  }

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(
      userData => {
        this.user = userData;
      });
    this.experienceService.getUserExperiences(this.userId).subscribe(
          experienceData => {
            this.userExperience = experienceData.content;
            this.userExperience.sort((a, b) => a.enddate > b.enddate ? -1 : 1);
          }
        );
    }

}
