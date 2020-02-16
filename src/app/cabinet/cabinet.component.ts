import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cabinet",
  templateUrl: "./cabinet.component.html",
  styleUrls: ["./cabinet.component.less"]
})
export class CabinetComponent implements OnInit {
  userVisible = true;
  companieVisible = false;
  projectsVisible = false;
  constructor() { }

  ngOnInit() {
  }

  showUser(): void {
    this.userVisible = true;
    this.companieVisible = false;
    this.projectsVisible = false;
  }

  showCompanie(): void {
    this.userVisible = false;
    this.companieVisible = true;
    this.projectsVisible = false;
  }
  showProjects(): void {
    this.userVisible = false;
    this.companieVisible = false;
    this.projectsVisible = true;
  }
}
