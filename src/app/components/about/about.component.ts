import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.less"]
})
export class AboutComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit() {}
}
