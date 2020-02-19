import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Project} from "src/app/models/projects";
@Component({
  selector: "app-user-projects",
  templateUrl: "./user-projects.component.html",
  providers: [HttpService],
  styleUrls: ["./user-projects.component.less"]
})
export class UserProjectsComponent implements OnInit {
  projects;
  userProjectsId = [1, 2];
  projectChangeMode = false;
  projectChangeId: number;
  addMode = false;
  myForm: FormGroup;

  constructor(private httpService: HttpService) {
    this.myForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "cost": new FormControl("", [Validators.required]),
      "timeLimitMonths": new FormControl("", [Validators.required]),
      "target": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.httpService.getProjects().subscribe(data => this.projects = data);
  }

  save(name: string, cost: number, timeLimitMonths: number, target: string, description: string): void {
    this.projects[this.projectChangeId].name = name;
    this.projects[this.projectChangeId].cost = cost;
    this.projects[this.projectChangeId].timeLimitMonths = timeLimitMonths;
    this.projects[this.projectChangeId].target = target;
    this.projects[this.projectChangeId].description = description;
    this.projectChangeId = null;
  }
  change(id: number): void {
    this.projectChangeId = id;
    this.myForm.setValue({
      name: this.projects[this.projectChangeId].name,
      cost: this.projects[this.projectChangeId].cost,
      timeLimitMonths: this.projects[this.projectChangeId].timeLimitMonths,
      target: this.projects[this.projectChangeId].target,
      description: this.projects[this.projectChangeId].description
    });
  }
  addProject(name: string, cost: number, timeLimitMonths: number, target: string, description: string): void {
    this.projects.push(new Project(name, target, description, timeLimitMonths, cost, false));
    this.userProjectsId.push(this.projects.length - 1);
    this.addMode = !this.addMode;
  }
}
