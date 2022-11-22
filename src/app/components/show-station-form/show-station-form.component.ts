import { Component, OnInit, DoCheck, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAtcData } from 'src/app/models/interfaces';
import { LocationIconService } from 'src/app/services/location-icon.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-show-station-form',
  templateUrl: './show-station-form.component.html',
  styleUrls: ['./show-station-form.component.css']
})
export class ShowStationFormComponent implements OnInit, OnChanges {
  @Input() formItem!:{station: IAtcData, markers: any};
  @Output() onShowForm: EventEmitter<boolean> = new EventEmitter<boolean>()
  form!: FormGroup;
  formAtc:any = [];

  constructor(private requestApi: LocationIconService, private mapComp: MapComponent) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {formItem} = changes;

    if(formItem.previousValue) {
      this.form.reset();

      this.fillForm(this.formItem.station);
    }

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      town: new FormControl('', [Validators.required]),
      work: new FormControl('', Validators.requiredTrue),
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
      address: new FormControl('', Validators.required)
    });
    this.fillForm(this.formItem.station);
  }

  closeForm() {
    this.onShowForm.emit(false);
  }

  removeStation() {
    const id = this.formItem.station['_id'];
    this.requestApi.removeLocation(id)
      .subscribe((r:any)=> {
        if(r.message === 'deleted'){
          this.formItem.markers[id].remove();
          this.form.reset();
          this.closeForm();
        } else {
          console.log(r);
        }
      });
  }

  submit() {

    if(this.form.valid){
      const formData:IAtcData = {
        ...this.form.value,
        address: this.formItem.station.address,
        location: [this.form.value.location.lang, this.form.value.location.lat],
      };

      const id = this.formItem.station['_id'];
      this.requestApi.updateLocation(id, formData)
      .subscribe((s: any)=> {
        if(s.ok === 1) {
          this.formItem.markers[id].remove();
          this.formItem.markers[id] = this.mapComp.pastMarker(formData, this.mapComp.map);

          this.form.reset();
          this.closeForm();
        }else {
          console.log(s);
        }
      });
    }else {
      console.log('invalid');

    }


  }

  removeAtc(id:number) {
    this.formAtc.splice(id, 1);
    const atcArrValue = this.form.get('atc') as FormArray;
    atcArrValue.value.splice(id, 1);
  }

  addAtc() {
    const atc = new FormControl('', Validators.required);
    const atcArr = this.form.controls['atc'] as FormArray<FormControl>;

    atcArr.push(atc);
    this.formAtc = atcArr.controls;
  }

  fillForm(station:IAtcData) {


    (this.form.controls['atc'] as FormArray<FormControl>).clear();
    (station.atc as string[]).forEach(item=> this.addAtc());

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
      address: new FormControl(station?.address!['display_name'], Validators.required)
    });

  }










}

/*
  const locatY = form.querySelector('#cordinat-y') as HTMLInputElement;
  locatY.value = `${station?.location[0]}`;
  const locatX = form.querySelector('#cordinat-x') as HTMLInputElement;
  locatX.value = `${station?.location[1]}`;

        "_id": "633e68d954daa27da5ef2d36",
        "town": "Abai_INT",
        "atc": [
            "ATC-12",
            "ATC-22",
            "ATC-32"
        ],
        "adress": {
            "place_id": 109534,
            "display_name": "Комсомол, Казахстан",
            "hamlet": "Комсомол",
            "country": "Казахстан",
            "country_code": "kz"
        },
        "location": [
            "41.2575",
            "68.9918"
        ],
        "work": true,
        "cabel": {
            "amount": 0,
            "busy": 0,
            "empty": 0,
            "length": 0
        }
    },
*/
