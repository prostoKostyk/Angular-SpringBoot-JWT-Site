import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-verification-code",
  templateUrl: "./verification-code.component.html",
  styleUrls: ["./verification-code.component.less"]
})
export class VerificationCodeComponent implements OnInit {
  code: string;
  message = "На вашу почту был отправлен проверочный код(1234)";
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goCreate() {
    if (this.code === "1234") {
      this.router.navigate(["/create-password"]);
    } else {
      this.message = "Неверный проверочный код";
    }
  }


}
