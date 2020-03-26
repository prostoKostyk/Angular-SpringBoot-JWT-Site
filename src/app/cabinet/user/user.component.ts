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
      "firstName": new FormControl("", [Validators.required]),
      "secondName": new FormControl("", [Validators.required]),
      "lastName": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "phoneNumber": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
    });

    this.experienceForm = new FormGroup({
      "company": new FormControl("", [Validators.required]),
      "position": new FormControl("", [Validators.required]),
      "beginning_date": new FormControl("", [Validators.required]),
      "end_date": new FormControl("", [Validators.required]),
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
          this.userExperience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
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
            this.userExperience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
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
      secondName: this.user.secondName, firstName: this.user.firstName,
      lastName: this.user.lastName, email: this.user.email, phoneNumber: this.user.phoneNumber
    });
  }

  addExperience(): void {
    this.experienceService.addExperience(this.experienceForm.value, this.curentUserId).subscribe(
      expData => {
        this.userService.getUser(this.curentUserId).subscribe(
          userData => {
            this.user = userData;
            this.userExperience = this.user.experience;
            this.userExperience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
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
                this.userExperience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
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

  getExperienceMonth(beginning_date, end_date) {
    return Math.floor(((new Date(end_date)).getTime() - (new Date(beginning_date)).getTime()) / 1000 / 60 / 60 / 24 / 30);
  }
}
