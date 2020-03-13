import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { AuthService } from "src/app/_services/auth.service";
import { UserService } from "src/app/_services/user.service";
import { HttpService } from "src/app/http.service";
import { CompaniesService } from "src/app/_services/companies.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const API_URL = "http://localhost:8080/";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Component({
  selector: "app-user-company",
  templateUrl: "./user-company.component.html",
  providers: [HttpService],
  styleUrls: ["./user-company.component.less"]
})
export class UserCompanyComponent implements OnInit {
  user;
  userId;
  company;
  companies;
  errorMessage = "";
  form;
  changeMode: boolean;
  addMode: boolean;
  chosenCompanyId;
  constructor(private http: HttpClient, public httpService: HttpService, private userService: UserService,
              private companiesService: CompaniesService, private tokenStorage: TokenStorageService) {
    this.form = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "form": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
      "foundation_date": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenStorage.getUser().id;
      this.userService.getUser(this.userId).subscribe(
        data => {
          this.user = data;
          this.company = this.user.companies[0];
          if (!this.company) {
            this.addMode = true;
          }
        });
    }
    this.companiesService.getCompanies().subscribe(
      data => {
        this.companies = data;
      });
  }

  addExistCompany() {
    let company;
    console.log(this.chosenCompanyId);
    this.companiesService.getCompany(+this.chosenCompanyId).subscribe(
      data => {
        company = data;
        this.companiesService.addExistingCompany(company, this.userId).subscribe();
        this.userService.getUser(this.userId).subscribe(
          data2 => {
            this.user = data2;
            this.company = this.user.companies[0];
            this.addMode = !this.addMode;
          });
      });
    }

  setCompany(company, userId) {
      return this.http.put(API_URL + "users/add_company/" + userId, {
        name: company.name,
        form: company.form,
        description: company.description,
        foundation_date: company.foundation_date
      }, httpOptions);
    }

  addCompany(): void {
      this.setCompany(this.form.value, this.userId).subscribe(
        data => {
          this.userService.getUser(this.userId).subscribe(
            data2 => {
              this.user = data2;
              this.company = this.user.companies[0];
              this.addMode = !this.addMode;
            });
        });
    }

  change(): void {
      this.changeMode = !this.changeMode;
      this.form.setValue({
        name: this.company.name,
        form: this.company.form,
        description: this.company.description,
        foundation_date: this.yyyymmdd(new Date(this.company.foundation_date)),
      });
    }

  save(): void {
      this.companiesService.updateCompany(this.form.value, this.company.id).subscribe(
        data => {
          this.userService.getUser(this.userId).subscribe(
            data2 => {
              this.user = data2;
              this.company = this.user.companies[0];
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
      this.changeMode = !this.changeMode;
    }

  formatDate(): string {
      const date = new Date(this.company.foundation_date);
      const arr = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
      const ddStr = date.getDate().toString();
      const mmStr = arr[date.getMonth()].toString();
      const yyStr = date.getFullYear().toString();
      return ddStr + " " + mmStr + " " + yyStr + " года";
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
      const ddmmyyyy: string = y + "-" + m + "-" + d;
      return ddmmyyyy;
    }
}
