import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
// import { MapComponent } from '../components/map/map.component';
// import { AddFormComponent } from '../components/add-form/add-form.component';
// import { ShowStationFormComponent } from '../components/show-station-form/show-station-form.component';

@Directive({
  selector: '[appMapClick]',
  providers: [
    // MapComponent
    // AddFormComponent, ShowStationFormComponent
  ]
})
export class MapClickDirective {
  constructor(
    private elem: ElementRef, private render2: Renderer2,
    // private mapComp: MapComponent
    // private AddForm: AddFormComponent,  private ShowForm : ShowStationFormComponent
    ) {  }

  @HostListener('document:keyup.escape', ['$event'])
  onKeyUpHandler(event: KeyboardEvent) {
    this.elem.nativeElement.click()

  }

}
