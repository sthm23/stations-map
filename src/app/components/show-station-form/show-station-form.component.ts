import { MapComponent } from './../map/map.component';
import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAtcData } from 'src/app/models/interfaces';
import { LocationIconService } from 'src/app/services/location-icon.service';
import { ShowFormServiceService } from 'src/app/services/show-form-service.service';

@Component({
  selector: 'app-show-station-form',
  templateUrl: './show-station-form.component.html',
  styleUrls: ['./show-station-form.component.css']
})
export class ShowStationFormComponent implements OnInit, DoCheck {
  // @Input('') showForm = true
  @Output() onShowForm: EventEmitter<boolean> = new EventEmitter<boolean>()

  map:any;
  form!: FormGroup;



  constructor(
    protected FormService: ShowFormServiceService
    ) {}

  ngOnInit(): void {
    this.form = this.FormService.form
  }

  ngDoCheck(): void {
    // this.map.on('click', (e:any) => console.log(e))
  }

  closeForm() {
    this.onShowForm.emit(false);
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
