import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";
import { ExperienceService } from "src/app/_services/experience.service";


@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  providers: [HttpService],
  styleUrls: ["./user.component.less"]
})
export class UserComponent implements OnInit {
  user;
  userExperience;
  curentUserId = 0;
  userForm: FormGroup;

  experienceForm: FormGroup;
  experienceToDeleteId: number;

  userChangeMode = false;
  addExperienceMode = false;

  constructor(public httpService: HttpService, public userService: UserService, public tokenStorage: TokenStorageService,
              public experienceService: ExperienceService) {
    this.userForm = new FormGroup({
      "username": new FormControl("", [Validators.required]),
      "firstname": new FormControl("", [Validators.required]),
      "secondname": new FormControl("", [Validators.required]),
      "lastname": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "phonenumber": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
    });

    this.experienceForm = new FormGroup({
      "company": new FormControl("", [Validators.required]),
      "position": new FormControl("", [Validators.required]),
      "beginningdate": new FormControl("2010-01-01", [Validators.required]),
      "enddate": new FormControl("2020-01-01", [Validators.required]),
      "experience_months": new FormControl(1, [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.curentUserId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.curentUserId).subscribe(
        userData => {
          this.user = userData;
          this.userExperience = this.user.experience;
          this.userExperience.sort((a, b) => a.enddate > b.enddate ? -1 : 1);
        }
      );
    }
  }

  saveUser() {
    this.userService.edit(this.userForm.value, this.curentUserId).subscribe(
      data => {
        this.userService.getUser(this.curentUserId).subscribe(
          data2 => {
            this.user = data2;
            this.userExperience.sort((a, b) => a.enddate > b.enddate ? -1 : 1);
          }
        );
      }
    );
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.replace("/login");
  }

  change(): void {
    this.userChangeMode = !this.userChangeMode;
    this.userForm.setValue({
      username: this.user.username,
      secondname: this.user.secondname, firstname: this.user.firstname,
      lastname: this.user.lastname, email: this.user.email, phonenumber: this.user.phonenumber
    });
  }

  addExperience(): void {
    this.experienceService.addExperience(this.experienceForm.value, this.curentUserId).subscribe(
      expData => {
        this.userService.getUser(this.curentUserId).subscribe(
          userData => {
            this.user = userData;
            this.userExperience = this.user.experience;
            this.userExperience.sort((a, b) => a.enddate > b.enddate ? -1 : 1);
          });
      });
    this.addExperienceMode = !this.addExperienceMode;
  }

  deleteExperience(experienceToDeleteId: number) {
    this.experienceService.deleteUserExperience(experienceToDeleteId).subscribe(
      data => {
        this.experienceService.deleteExperience(experienceToDeleteId).subscribe(
          data2 => {
            this.userService.getUser(this.curentUserId).subscribe(
              userData => {
                this.user = userData;
                this.userExperience = this.user.experience;
                this.userExperience.sort((a, b) => a.enddate > b.enddate ? -1 : 1);
              });
          });
      });
  }

  dateConvert(date: Date): string {
    date = new Date(date);
    const y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    if (d.length === 1) {
      d = "0" + d;
    }
    if (m.length === 1) {
      m = "0" + m;
    }
    const ddmmyyyy: string = d + " - " + m + " - " + y;
    return ddmmyyyy;
  }

  getExperienceMonth(beginningdate, enddate) {
    return Math.floor(((new Date(enddate)).getTime() - (new Date(beginningdate)).getTime()) / 1000 / 60 / 60 / 24 / 30);
  }
}
