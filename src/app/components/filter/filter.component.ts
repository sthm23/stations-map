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
    {value: 'Tashkentsh', viewValue: 'г.Ташкент'},
    {value: 'Tashkent', viewValue: 'Ташкент обл'},
    {value: 'Andijan', viewValue: 'Андижан'},
    {value: "Fergana", viewValue: 'Фергана'},
    {value: 'Namangan', viewValue: 'Наманган'},
    {value: 'Jizzakh', viewValue: 'Джиззак'},
    {value: 'Sirdaryo', viewValue: 'Сирдарё'},
    {value: 'Samarqand', viewValue: 'Самарканд'},
    {value: 'Navoiy', viewValue: 'Навои'},
    {value: 'Bukhara', viewValue: 'Бухоро'},
    {value: 'Xorazm', viewValue: 'Хоразм'},
    {value: "Karakalpakstan", viewValue: 'Каракалпакстан Респ'},
    {value: 'Qashqadaryo', viewValue: 'Кашкадарё'},
    {value: 'Surxondaryo', viewValue: 'Сурхандарё'},
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

    // region?.regions.filter((item, ind)=>item.)
    // console.log(region);

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
          const dist:regions | undefined = (region.regions as regions[]).find(item=> (item.name+item.type) === key);
          // console.log(dist);
          if(dist !== undefined){
            (obj.dist as regions[]).push(dist);
          }
        }
      }
      // console.log(this.toppings);
      // console.log(obj);
      this.onRegionFilter.emit(obj);
    }


  }
}

