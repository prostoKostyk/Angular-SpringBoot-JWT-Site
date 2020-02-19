import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  providers: [HttpService],
  styleUrls: ["./user.component.less"]
})
export class UserComponent implements OnInit {
  users;
  CurentUserId = 0;
  userChangeMode = false;
  myForm: FormGroup;
  constructor(private httpService: HttpService) {
    this.myForm = new FormGroup({
      FIOForm: new FormGroup({
        "firstName": new FormControl("", [Validators.required]),
        "secondName": new FormControl("", [Validators.required]),
        "lastName": new FormControl("", [Validators.required])
      }),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phone": new FormControl("", [Validators.required, Validators.pattern("[0-9]{11}")]),
    });
  }

  ngOnInit() {
    this.httpService.getUsers().subscribe(data => this.users = data);
  }

  change(): void {
    this.userChangeMode = !this.userChangeMode;
    this.myForm.setValue({
      FIOForm: {
        secondName: this.users[this.CurentUserId].secondName, firstName: this.users[this.CurentUserId].firstName,
        lastName: this.users[this.CurentUserId].lastName
      }, email: this.users[this.CurentUserId].email, phone: this.users[this.CurentUserId].phoneNumber
    });
  }
  save(firstName: string, lastName: string, secondName: string, phone: string, email: string): void {
    this.userChangeMode = !this.userChangeMode;
    this.users[this.CurentUserId].secondName = secondName;
    this.users[this.CurentUserId].firstName = firstName;
    this.users[this.CurentUserId].lastName = lastName;
    this.users[this.CurentUserId].email = email;
    this.users[this.CurentUserId].phoneNumber = phone;
  }
}
