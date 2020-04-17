import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GlobalVariable } from "src/app/_helpers/variables.service";
import { CompaniesService } from "src/app/_services/companies.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";

const API_URL = GlobalVariable.API_URL;
const httpOptions = GlobalVariable.httpOptions;

@Component({
  selector: "app-user-company",
  templateUrl: "./user-company.component.html",
  styleUrls: ["./user-company.component.less"]
})

export class UserCompanyComponent implements OnInit {
  user;
  userCompany;
  curentUserId: number;

  allCompanies;
  chosenCompanyId: number;
  companyForm;

  companyChangeMode: boolean;
  addCompanyMode: boolean;

  constructor(private http: HttpClient, private userService: UserService,
              private companiesService: CompaniesService, private tokenStorage: TokenStorageService) {
    this.companyForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "form": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
      "foundationDate": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.curentUserId = this.tokenStorage.getUser().id;
      this.companiesService.getUserCompanies(this.curentUserId).subscribe(
        companyData => {
          this.userCompany = companyData[0];
          if (!this.userCompany) {
            this.addCompanyMode = true;
          }
        }
      );
    }
    this.companiesService.getCompanies().subscribe(
      allCompaniesData => {
        this.allCompanies = allCompaniesData;
      });
  }

  /**
   * Метод для добавления пользователю существующей компании
   */
  addExistCompany() {
    let userCompany;
    this.companiesService.getCompany(+this.chosenCompanyId).subscribe(
      existCompany => {
        userCompany = existCompany;
        this.companiesService.addExistingCompany(userCompany, this.curentUserId).subscribe(
          existCompany2 => {
            this.userService.getUser(this.curentUserId).subscribe(
              userData => {
                this.user = userData;
                this.userCompany = this.user.companies[0];
                this.addCompanyMode = !this.addCompanyMode;
              });
          });
      });
  }

  /**
   * Метод для создания и добавления пользователю новой компании
   */
  addCompany(): void {
    this.companiesService.addNewCompany(this.companyForm.value, this.curentUserId).subscribe(
      data => {
        this.userService.getUser(this.curentUserId).subscribe(
          data2 => {
            this.user = data2;
            this.userCompany = this.user.companies[0];
            this.addCompanyMode = !this.addCompanyMode;
          });
      });
  }

  /**
   * Метод для добавления данных изменяемой компании в companyForm
   */
  change(): void {
    this.companyChangeMode = !this.companyChangeMode;
    this.companyForm.setValue({
      name: this.userCompany.name,
      form: this.userCompany.form,
      description: this.userCompany.description,
      foundationDate: this.dateConvert(new Date(this.userCompany.foundationDate)),
    });
  }

  /**
   * Метод для сохранения данных изменяемой компании
   */
  save(): void {
    this.companiesService.updateCompany(this.companyForm.value, this.userCompany.id).subscribe(
      data => {
        this.companiesService.getUserCompanies(this.curentUserId).subscribe(
          companyData => {
            this.userCompany = companyData[0];
          }
        );
      }
    );
    this.companyChangeMode = !this.companyChangeMode;
  }

  /**
   * Метод для конвентирования даты из 2019-12-31T21:00:00.000+0000 в 01 - 01 - 2019
   */
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
    const ddmmyyyy: string = y + "-" + m + "-" + d;
    return ddmmyyyy;
  }

  /**
   * Метод для конвентирования даты из 01 - 01 - 2019 в 1 января 2019 года
   */
  formatDateMonthToString(): string {
    const date = new Date(this.userCompany.foundationDate);
    const arr = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    const ddStr = date.getDate().toString();
    const mmStr = arr[date.getMonth()].toString();
    const yyStr = date.getFullYear().toString();
    return ddStr + " " + mmStr + " " + yyStr + " года";
  }
}
