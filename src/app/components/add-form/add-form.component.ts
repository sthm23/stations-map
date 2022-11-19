import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAtcData } from 'src/app/models/interfaces';
import { LocationIconService } from 'src/app/services/location-icon.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit, OnChanges {
  @Output() onAddFormShow = new EventEmitter<boolean>();
  @Input() location:any;
  map:any;
  form!: FormGroup;
  formAtc:any = [];
  clickedIconId = '';
  station!:IAtcData;

  constructor(private requestApi: LocationIconService, private mapComp: MapComponent) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {location} = changes;
    console.log(changes);

    if(location.previousValue) {
      this.form.reset();
      this.updateForm();
    }

  }

  ngOnInit(): void {

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
      address: new FormControl('', Validators.required)
    });

    this.updateForm();
  }

  updateForm() {
    const address$ = this.requestApi.getAddress(this.location.lat, this.location.lng);
    address$.subscribe((obs:any)=> {
      // console.log(obs);
      this.station = {
        town: '',
        atc: [''],
        address: {
          display_name: obs.display_name,
          osm_id: obs.osm_id,
          osm_type: obs.osm_type,
          ...obs.address
        },
        location: [this.location.lat.toFixed(4), this.location.lng.toFixed(4)],
        cabel:{
          length: 0,
          amount: 0,
          empty: 0,
          busy: 0,
        },
        work: true
      }
      this.fillForm();
    });
  }

  submit() {
    const formData:IAtcData = {
      ...this.form.value,
      address: this.station.address,
      location: this.station.location,
    }

    this.requestApi.addLocation(formData)
      .subscribe(s=> {
        if(s._id){
          const id = s['_id'];
          const station:any = this.mapComp.pastMarker(s, this.mapComp.map);
          station['_icon'].setAttribute('id', id);
          this.mapComp.markersObj[id] = station as any;
          this.form.reset();
          this.closeForm();
        }else {
          console.log(s);
        }
      })
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
  closeForm() {
    this.onAddFormShow.emit(false);
  }

  fillForm() {
    (this.form.controls['atc'] as FormArray<FormControl>).clear();
    (this.station.atc as string[]).forEach(item=> this.addAtc())

    this.form = new FormGroup({
      town: new FormControl(this.station?.town, [Validators.required]),
      work: new FormControl(this.station?.work, Validators.requiredTrue),
      cabel: new FormGroup({
        amount: new FormControl(this.station?.cabel?.amount, Validators.required),
        busy: new FormControl(this.station?.cabel?.busy, Validators.required),
        empty: new FormControl(this.station?.cabel?.empty, Validators.required),
        length: new FormControl(this.station?.cabel?.length, Validators.required),
      }),
      atc: new FormArray((this.station.atc as string[]).map(item=> new FormControl(item))),
      location: new FormGroup({
        lang: new FormControl(this.station?.location[0], Validators.required),
        lat: new FormControl(+this.station?.location[1], Validators.required)
      }),
      address: new FormControl(this.station?.address!['display_name'], Validators.required)
    });
  }


}
