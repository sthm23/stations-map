import { LocationIconService } from './../../services/location-icon.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IAtcData } from 'src/app/models/interfaces';
import { allRegions } from 'src/app/data/regions/allRegions';
import { allDistrict } from 'src/app/data/regions/allDistrict';
import { RegionsEmitObj } from '../filter/filter.component';
import { uzb } from 'src/app/data/regions/uzb';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  filterBlock = false;
  markers:IAtcData[] = []
  markersObj:any = {}
  map!:L.Map;
  allRegionLayer!:L.GeoJSON<any>;
  showUpdateForm = false
  showFormItem!: {station:IAtcData, markers: any};
  showAddForm = false
  addFormLocation!:L.LatLng;

  constructor(
    private requestApi: LocationIconService,
  ) {  }

  ngOnInit(): void {
    this.map = this.drowMap();
    this.drowMapInfo(this.map);
    const uzbMap = this.sortRegions();

    this.allRegionLayer = this.drowRegionsInMap(uzb, this.map);
    this.generateMarkers(this.map);

    this.map.on('click', (e) => {
      const location = e.latlng;
      // console.log(location);

    if ((e.originalEvent.target as HTMLElement).tagName === 'IMG') {
      this.showUpdateForm = true
      const id = (e.originalEvent.target as HTMLElement).id;
      const station:IAtcData = this.markers.find(item => item._id === id)!;
      this.showFormItem = {station: station, markers: this.markersObj};
    } else {
        this.showAddForm = true
        this.addFormLocation = location
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
    L.tileLayer('https://map.uztelecom.uz/tile/{z}/{x}/{y}.png', {
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
    for (let i = 0; i < arr.length; i++) {
      const icon:IAtcData = arr[i];
      const id = icon['_id'];

      // Create and save a reference to each marker
      const station: any = this.pastMarker(icon, map) //.bindPopup(answerObj.answer);
      station['_icon'].setAttribute('id', id);
      this.markersObj[id] = station as any;
    }
  }

  pastMarker(icon:IAtcData, map:any) {
   return L.marker([+icon.location[0], +icon.location[1]], { icon: this.setIconColor(icon.work)}).addTo(map)
  }

  setIconColor(work:boolean) {
    const greenIcon = L.icon({
      iconUrl: './assets/icons/locat_con_gren.svg',

      iconSize: [12, 12], // size of the icon
      iconAnchor: [10, 24], // маргин когда увечения попровляется
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    const redIcon = L.icon({
      iconUrl: './assets/icons/locat_con.svg',

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

  showUpdateFormFunc(e:boolean) {
    this.showUpdateForm = e;
  }

  showAddFormFunc(e:boolean) {
    this.showAddForm = e;
  }

  filterRegion(e:RegionsEmitObj) {
    // console.log(e);
    let regionMap:any;
    let location!:IAtcData[];
    if(e.id){
      this.map.setView([+e.search_detail.coordinates.lat, +e.search_detail.coordinates.lon], +e.search_detail.coordinates.zoom)
      if(e.dist.length === 0) {
        location = this.markers.filter(item=> +(item.address as any)['osm_id'] === e.search_detail.osmid);

        regionMap = allRegions.filter(item=> item.id === e.id)
        .map(item => {
          return item.mapIn
        }).filter((item: any ) => item.geometry !== null);
      } else {
        const region = allDistrict.find(item => item.id === e.id);
        regionMap = region?.regions
          .filter(item => e.dist.some(el=> el.regionId === item.id))
            .map(item => item.map_in);

            location = this.markers.filter(item=> +(item.address as any)['osm_id'] === e.search_detail.osmid)
              .filter(item=> e.dist.some(el=> (item.address?.display_name.toLowerCase() as string).includes(el.name.toLowerCase())));
      }
    } else {
      this.map.setView([40.191818, 63.564393], 6)
      regionMap = allRegions.map((item) => {
        return item.mapIn
      }).filter((item: any ) => item.geometry !== null);
      location = this.markers
    }

    this.markers.forEach(item=>{
      const id = item._id;
      this.markersObj[id].remove()
    })
    // console.log('location', location);
    // console.log('filter', e);
    this.allRegionLayer.remove();
    this.allRegionLayer = this.drowRegionsInMap(regionMap, this.map);
    this.addMarkersToMap(this.map, location)

  }

}
