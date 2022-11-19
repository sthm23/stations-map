import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MapComponent } from '../components/map/map.component';
import { IAtcData } from '../models/interfaces';
import { LocationIconService } from './location-icon.service';

@Injectable({
  providedIn: 'root'
})
export class ShowFormServiceService {
  formAtc:any = [];
  clickedIconId = ''
  showFormVar = false;
  elemIcon!:HTMLElement;
  form:FormGroup = new FormGroup({
    town: new FormControl('', [Validators.required]),
    work: new FormControl(true, Validators.requiredTrue),
    cabel: new FormGroup({
      amount: new FormControl(null, Validators.required),
      busy: new FormControl(null, Validators.required),
      empty: new FormControl(null, Validators.required),
      length: new FormControl(null, Validators.required),
    }),
    atc: new FormArray([]),
    location: new FormGroup({
      lang: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required)
    }),
    adress: new FormControl('', Validators.required)
  });

  constructor(
    private requestApi: LocationIconService,
    private mapCom: MapComponent,
  ) { }

  submit() {
    const formData = {...this.form.value}
    console.log(this.form);
    console.log(formData);
  }

  addAtc() {
    const atc = new FormControl('', Validators.required);
    const atcArr = this.form.controls['atc'] as FormArray<FormControl>;

    atcArr.push(atc);
    this.formAtc = atcArr.controls;
  }

  removeAtc(id:number) {
    this.formAtc.splice(id, 1);
    const atcArrValue = this.form.get('atc') as FormArray;
    atcArrValue.value.splice(id, 1);
  }

  removeStation() {
    const formData = {...this.form.value}
    console.log(formData, this.clickedIconId);
    this.requestApi.removeLocation(this.clickedIconId)
      .subscribe(r=> console.log(r));
    this.elemIcon.remove();
    (this.form.controls['atc'] as FormArray<FormControl>).clear();
    const station:IAtcData = this.mapCom.markers.find(item => item._id === this.clickedIconId)!;
    (station.atc as string[]).forEach((item, ind)=> this.removeAtc(ind))
    this.form.reset()
  }

  fillForm(station:IAtcData) {
    (this.form.controls['atc'] as FormArray<FormControl>).clear();
    (station.atc as string[]).forEach(item=> this.addAtc())

    this.form = new FormGroup({
      town: new FormControl(station?.town, [Validators.required]),
      work: new FormControl(station?.work, Validators.requiredTrue),
      cabel: new FormGroup({
        amount: new FormControl(station?.cabel?.amount, Validators.required),
        busy: new FormControl(station?.cabel?.busy, Validators.required),
        empty: new FormControl(station?.cabel?.empty, Validators.required),
        length: new FormControl(station?.cabel?.length, Validators.required),
      }),
      atc: new FormArray((station.atc as string[]).map(item=> new FormControl(item))),
      location: new FormGroup({
        lang: new FormControl(station?.location[0], Validators.required),
        lat: new FormControl(station?.location[1], Validators.required)
      }),
      adress: new FormControl(station?.adress!['display_name'], Validators.required)
    });
  }

}
