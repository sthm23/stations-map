import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMapClick]'
})
export class MapClickDirective {

  constructor(private elem: ElementRef, private render2: Renderer2) {
    // console.log(this.elem.nativeElement);

  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
}

}
