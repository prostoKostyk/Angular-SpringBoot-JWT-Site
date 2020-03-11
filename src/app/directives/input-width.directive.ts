import {Directive, HostListener, ElementRef, Input, HostBinding, OnInit} from "@angular/core";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "[setWidth]"
})
export class InputWidthDirective {
 @Input("setWidth") word;
 constructor(private el: ElementRef) { }
 @HostListener("change") ngOnChanges(): void {
  if (this.word.length < 2) {
    this.setWidth(15);
   } else {
   this.setWidth(this.word.length * 10.8);
   }
 }

 setWidth(width: number): void {
   this.el.nativeElement.style.width = width + "px";
 }
}
