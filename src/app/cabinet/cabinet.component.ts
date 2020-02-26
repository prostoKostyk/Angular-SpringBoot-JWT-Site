import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cabinet",
  templateUrl: "./cabinet.component.html",
  styleUrls: ["./cabinet.component.less"]
})
export class CabinetComponent implements OnInit {
  userVisible = true;
  companyVisible = false;
  projectsVisible = false;
  constructor() { }

  ngOnInit() {
  }

  showUser(): void {
    this.userVisible = true;
    this.companyVisible = false;
    this.projectsVisible = false;
  }

  showcompany(): void {
    this.userVisible = false;
    this.companyVisible = true;
    this.projectsVisible = false;
  }
  showProjects(): void {
    this.userVisible = false;
    this.companyVisible = false;
    this.projectsVisible = true;
  }
}
