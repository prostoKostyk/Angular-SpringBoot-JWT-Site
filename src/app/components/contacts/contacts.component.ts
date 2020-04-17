import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.less"]
})
export class ContactsComponent implements OnInit {

 placemarkProperties = {
    hintContent: "Hint content",
    balloonContent: "Baloon content"
  };

  placemarkOptions = {
    iconLayout: "default#image",
    iconImageHref: "https://image.flaticon.com/icons/svg/1476/1476763.svg",
    iconImageSize: [32, 32]
  };

  constructor() { }

  ngOnInit() {

  }
}
