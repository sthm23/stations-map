import { LocationIconService } from './../../services/location-icon.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IAtcData } from 'src/app/models/interfaces';
import { allRegions } from 'src/app/data/regions/allRegions';
import { ShowFormServiceService } from 'src/app/services/show-form-service.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [LocationIconService, ShowFormServiceService]
})
export class MapComponent implements OnInit {
  markers:IAtcData[] = []
  map!:L.Map;
  allRegionLayer!:L.GeoJSON<any>;
  showUpdateForm = false
  showAddForm = false
  constructor(
    private requestApi: LocationIconService,
    // private ShowFormService: ShowFormServiceService
  ) { }

  ngOnInit(): void {
    this.map = this.drowMap();
    this.drowMapInfo(this.map);
    const uzbMap = this.sortRegions();

    this.allRegionLayer = this.drowRegionsInMap(uzbMap, this.map);
    // this.generateMarkers(this.map);

    this.map.on('click', (e) => {
      const location = e.latlng;
      console.log(location);

    if ((e.originalEvent.target as HTMLElement).tagName === 'IMG') {
        // const id = (e.originalEvent.target as HTMLElement).id;
        // this.ShowFormService.clickedIconId = id;
        // this.ShowFormService.elemIcon = e.originalEvent.target as HTMLElement;
        // const station:IAtcData = this.markers.find(item => item._id === id)!;
        // this.ShowFormService.fillForm(station)
        this.showUpdateForm = true
    } else {
        this.showAddForm = true
    }

    })
  }


  drowMap() {
    return L.map('map', {
      minZoom: 3, //6
      maxZoom: 16
    }).setView([40.191818, 63.564393], 6)
  }

  drowMapInfo(map: any) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '© OpenStreetMap'
    }).addTo(map);
  }

  sortRegions() {
    return allRegions.map(item => {
      return item.mapIn
    }).filter((item: any ) => item.geometry !== null);
  }

  drowRegionsInMap(uzbMap: any, map: any) {
    return L.geoJSON(uzbMap, {
      style: this.mapRegionInlineColor
     }).addTo(map);
  }

  mapRegionInlineColor(_feature:any) {
    return {
      fillColor: "#58c8eb",
      color: "#4a4a4a",
    }
  }

  addMarkersToMap(map:any, arr:IAtcData[]) {

    const markers:any = {};
    for (let i = 0; i < arr.length; i++) {
      const icon:IAtcData = arr[i];
      const id = icon['_id'];
      // Create and save a reference to each marker
      const station: any = this.pastMarker(icon, map) //.bindPopup(answerObj.answer);
      station['_icon'].setAttribute('id', id);
      markers[id] = station as any;
    }
  }

  pastMarker(icon:IAtcData, map:any) {
   return L.marker([+icon.location[0], +icon.location[1]], { icon: this.setIconColor(icon.work)}).addTo(map)
  }

  setIconColor(work:boolean) {
    const greenIcon = L.icon({
      iconUrl: '../../../assets/icons/locat_con_gren.svg',

      iconSize: [12, 12], // size of the icon
      iconAnchor: [10, 24], // маргин когда увечения попровляется
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    const redIcon = L.icon({
      iconUrl: '../../../assets/icons/locat_con.svg',

      iconSize: [12, 12], // size of the icon
      iconAnchor: [10, 24], // маргин когда увечения попровляется
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    return work ? greenIcon : redIcon;
  }


  generateMarkers(map:any) {
    const stationArr = this.requestApi.getLocation();

    stationArr.subscribe(atc => {
      this.markers = atc
      this.addMarkersToMap(map, atc)
    });
  }

  drowRegions() {

  }

  showUpdateFormFunc(e:boolean) {
    this.showUpdateForm = e;
  }

  showAddFormFunc(e:boolean) {
    this.showAddForm = e;
  }

  filterRegion(e:any) {
    // console.log(e);
    const regionMap:any = allRegions.filter(item=> item.id === e.id)
    .map(item => {
      return item.mapIn
    }).filter((item: any ) => item.geometry !== null);

    // console.log(regionMap);

    this.allRegionLayer.remove();
    this.allRegionLayer = this.drowRegionsInMap(regionMap, this.map);
  }

}
