import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  providers: [HttpService],
  styleUrls: ["./user.component.less"]
})
export class UserComponent implements OnInit {
  users;
  CurentUserId = 0;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getUsers().subscribe(data => this.users = data);
  }

}
