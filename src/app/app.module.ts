import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule  } from '@angular/cdk/drag-drop';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { StaticComponent } from './components/static/static.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { LocationIconComponent } from './components/location-icon/location-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapClickDirective } from './directives/map-click.directive';
import { ShowStationFormComponent } from './components/show-station-form/show-station-form.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorComponent,
    StaticComponent,
    HeaderComponent,
    MapComponent,
    LocationIconComponent,
    MapClickDirective,
    ShowStationFormComponent,
    AddFormComponent,
    FilterComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatButtonToggleModule,
    DragDropModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    BrowserAnimationsModule,
    LeafletModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
