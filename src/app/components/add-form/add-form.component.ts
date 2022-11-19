import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAtcData } from 'src/app/models/interfaces';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  @Output() onAddFormShow = new EventEmitter<boolean>()
  map:any;
  form!: FormGroup;
  formAtc:any = [];
  clickedIconId = ''
  constructor(private mapCom: MapComponent) {}

  ngOnInit(): void {
    // this.mapCom.map.on('click', (e) => {
    //   const location = e.latlng;
    // if ((e.originalEvent.target as HTMLElement).tagName === 'IMG') {
    //     const id = (e.originalEvent.target as HTMLElement).id;
    //     this.clickedIconId = id;
    //     const station:IAtcData = this.mapCom.markers.find(item => item._id === id)!;
    // }

    // })

    this.form = new FormGroup({
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
  }

  ngDoCheck(): void {
    // this.map.on('click', (e:any) => console.log(e))
  }

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
  closeForm(e:Event, elem?: HTMLElement) {
    // elem?.remove();
    this.onAddFormShow.emit(false);
  }


}
