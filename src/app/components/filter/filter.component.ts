import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {republic, regions, ISearch} from './allRespublicNameToFilter';

interface Region {
  value: string;
  viewValue: string;
}
export interface RegionsEmitObj {
  id: number | undefined,
  search_detail: ISearch,
  region: string,
  dist: regions[] | []
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
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
    {value: 'all', viewValue: 'Все регионы'},
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
      const name = item.name+item.type;
      obj[name] = false;
    });
    this.toppings  = this._formBuilder.group(obj);
    this.regionBlock = true;

  }

  submit() {
    const region = republic.find(item => item.name === this.selectValue);
    const search_detail:ISearch = {...region?.search_detail!};
    const obj:RegionsEmitObj = {
      id: region?.respublicId,
      search_detail: search_detail,
      region: this.selectValue,
      dist: []
    }
    if(region === undefined) {
      this.onRegionFilter.emit(obj);
    } else {
      // console.log(this.toppings);

      for (const key in this.toppings.value) {
        if(this.toppings.value[key]){
          const dist:regions = (region.regions as regions[]).find(item=> item.name+item.type === key)!;
          console.log(dist);
          (obj.dist as regions[]).push(dist);
        }
      }
      // console.log(this.toppings);

      this.onRegionFilter.emit(obj);
    }


  }
}

