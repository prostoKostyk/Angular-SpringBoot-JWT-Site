import { Component, OnInit } from "@angular/core";
import { ExperienceService } from "../_services/experience.service";
import { HttpService } from "../http.service";
import { UserComponent } from "../cabinet/user/user.component";
import { UserService } from "../_services/user.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  providers: [HttpService],
  styleUrls: ["./user-info.component.less"]
})
export class UserInfoComponent extends UserComponent implements OnInit {
  userId: number;

  userAdmin = false;

  subscription: Subscription;

  constructor(public httpService: HttpService, public userService: UserService, public tokenStorage: TokenStorageService,
              public experienceService: ExperienceService, private activateRoute: ActivatedRoute, ) {
    super(httpService, userService, tokenStorage, experienceService);
    this.subscription = activateRoute.params.subscribe(params => this.userId = params.userid);
  }

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(
      userData => {
        this.user = userData;
      });
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.userId).subscribe(
        userData => {
          this.user = userData;
          for (const role of this.user.roles) {
            if (role.name === "ROLE_ADMIN") {
              this.userAdmin = true;
            }
          }
        }
      );
    }
  }

}
