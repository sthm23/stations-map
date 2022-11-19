import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {republic, regions} from './allRespublicNameToFilter';

interface Region {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  // providers: [ShowFormServiceService]
})
export class FilterComponent implements OnInit {
  @Output() onRegionFilter = new EventEmitter<any>()
  selectValue!: string;
  regionBlock= false;
  regions: Region[] = [
    {value: 'tashkentsh', viewValue: 'г.Ташкент'},
    {value: 'toshkent', viewValue: 'Ташкент обл'},
    {value: 'andijon', viewValue: 'Андижан'},
    {value: "farg'ona", viewValue: 'Фергана'},
    {value: 'namangan', viewValue: 'Наманган'},
    {value: 'jizzax', viewValue: 'Джиззак'},
    {value: 'sirdaryo', viewValue: 'Сирдарё'},
    {value: 'samarqand', viewValue: 'Самарканд'},
    {value: 'navoi', viewValue: 'Навои'},
    {value: 'buxoro', viewValue: 'Бухоро'},
    {value: 'xorazm', viewValue: 'Хоразм'},
    {value: "qoraqalpog'iston", viewValue: 'Каракалпакстан Респ'},
    {value: 'qashqadaryo', viewValue: 'Кашкадарё'},
    {value: 'surxondaryo', viewValue: 'Сурхандарё'},
  ];
  districts!:regions[];
  toppings!:any;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  showDistricts() {
    // console.log(this.selectValue);
    const region = republic.find(item => item.name === this.selectValue)!;
    // console.log(region);
    this.districts = region?.regions;
    const obj:any = {};
    region?.regions.forEach(item => {
      const a = item.name;
      obj[a] = false;
    })
    this.toppings  = this._formBuilder.group(obj);
    this.regionBlock = true;

  }

  submit() {
    const region = republic.find(item => item.name === this.selectValue)!;
    const obj = {
      id: region.respublicId,
      region: this.selectValue,
      dist: []
    }

    for (const key in this.toppings.value) {
      this.toppings.value[key] ? (obj.dist as string[]).push(key) : ''
    }

    this.onRegionFilter.emit(obj);
  }
}

