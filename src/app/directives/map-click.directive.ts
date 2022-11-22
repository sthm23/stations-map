import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { MapComponent } from '../components/map/map.component';
// import { AddFormComponent } from '../components/add-form/add-form.component';
// import { ShowStationFormComponent } from '../components/show-station-form/show-station-form.component';

@Directive({
  selector: '[appMapClick]',
  providers: [
    MapComponent
    // AddFormComponent, ShowStationFormComponent
  ]
})
export class MapClickDirective {

  constructor(
    private elem: ElementRef, private render2: Renderer2,
    private mapComp: MapComponent
    // private AddForm: AddFormComponent,  private ShowForm : ShowStationFormComponent
    ) {  }

  @HostListener('document:keyup.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // if(this.ShowForm['mapComp'].showUpdateForm) {
    //   // this.ShowForm.form.reset();
    //   this.ShowForm.closeForm();
    // }
    // if(this.AddForm.formStatus) {
    //   this.AddForm.onAddFormShow.emit(false);

    // }
    // this.elem.nativeElement.closeForm()
    console.log(this.mapComp);

    // console.log(this.mapComp, this.elem, this.render2);

}

}
