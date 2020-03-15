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
  id: number;
  CurentUserId = 0;
  userChangeMode = false;
  errorMessage = "";
  form: FormGroup;
  experienceForm: FormGroup;
  experience;
  experienceId: number;
  addMode = false;
  constructor(public httpService: HttpService, public userService: UserService, public tokenStorage: TokenStorageService,
              public experienceService: ExperienceService) {
    this.form = new FormGroup({
      "username": new FormControl("", [Validators.required]),
      "first_name": new FormControl("", [Validators.required]),
      "second_name": new FormControl("", [Validators.required]),
      "last_name": new FormControl("", [Validators.required]),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phone_number": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
    });

    this.experienceForm = new FormGroup({
      "company": new FormControl("", [Validators.required]),
      "position": new FormControl("", [Validators.required]),
      "beginning_date": new FormControl("", [Validators.required]),
      "end_date": new FormControl("", [Validators.required]),
      "experience_months": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;
      this.userService.getUser(this.id).subscribe(
        data => {
          this.user = data;
          this.experience = this.user.experience;
          this.experience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }
  saveUser() {
    this.userService.edit(this.form.value, this.id).subscribe(
      data => {
        this.userService.getUser(this.id).subscribe(
          data2 => {
            this.user = data2;
            this.experience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.replace("/login");
  }

  change(): void {
    this.userChangeMode = !this.userChangeMode;
    this.form.setValue({
      username: this.user.username,
      second_name: this.user.second_name, first_name: this.user.first_name,
      last_name: this.user.last_name, email: this.user.email, phone_number: this.user.phone_number
    });
  }

  addExperience(): void {
    this.experienceService.addExperience(this.experienceForm.value, this.user.id).subscribe(
      data => {
      this.userService.getUser(this.id).subscribe(
        data2 => {
          this.user = data;
          this.experience = this.user.experience;
          this.experience.sort((a, b) => a.end_date > b.end_date ? -1 : 1);
        });
      });
    this.addMode = !this.addMode;
  }

  yyyymmdd(date: Date): string {
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

  getTime(beginning_date, end_date) {
    return Math.floor(((new Date(end_date)).getTime() - (new Date(beginning_date)).getTime()) / 1000 / 60 / 60 / 24 / 30);
  }
}
