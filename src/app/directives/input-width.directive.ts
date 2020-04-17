import {Directive, HostListener, ElementRef, Input, OnChanges} from "@angular/core";

@Directive({
    selector: "[setWidth]"
})
export class InputWidthDirective implements OnChanges  {
 @Input("setWidth") word;
 constructor(private el: ElementRef) { }
 @HostListener("change") ngOnChanges(): void {
  if (this.word.length < 3) {
    this.setWidth(40);
   } else {
   this.setWidth(this.word.length * 11.2);
   }
 }

 setWidth(width: number): void {
   this.el.nativeElement.style.width = width + "px";
 }
}
