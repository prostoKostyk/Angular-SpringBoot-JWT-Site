import { Component, OnInit, Input } from "@angular/core";
@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.less"]
})
export class PopupComponent implements OnInit {

  @Input() error1: string;
  @Input() usl: string;
  constructor() { }

  ngOnInit() {
  }

}
