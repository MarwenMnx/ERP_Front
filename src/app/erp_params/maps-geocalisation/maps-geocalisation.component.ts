import {
  AfterViewInit,
  Component,
  DestroyRef, Inject,
  inject,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';


import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl, Validators
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import { aioContactData } from 'src/static-data/contact-data';
import { Output, EventEmitter } from '@angular/core';
import { hideLoading, isObjectIdMongoose, showAlertError, showLoading } from 'src/app/global-functions';
import {enum_table_piecejointe} from "../../global-enums";
import {TokenService} from "../../services/token.service";
import {GoogleMapsModule} from '@angular/google-maps';
import { SharedModule } from 'src/app/utils/shared.module';
import {Client} from "../clients/models/client.model";
import {MapsGeocalisation} from "./models/MapsGeocalisation.model";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


@Component({
  selector: 'vex-maps-geocalisation',
  templateUrl: './maps-geocalisation.component.html',
  styleUrls: ['./maps-geocalisation.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,GoogleMapsModule,SharedModule
  ]
})
export class MapsGeocalisationComponent   implements OnInit {


  form = this.fb.group({
    _id:        [this.defaults?._id || ''],
    longitude:  [this.defaults?.longitude || 0] ,
    latitude:   [this.defaults?.latitude || 0] ,
    adresse:    [this.defaults?.adresse || ''] ,
    url_maps:   [this.defaults?.url_maps || ''] ,
  });

  positionMap = {
    street: 'Brookline',
    num: '123',
    city: 'NewYork',
  };
  lat     = 28.730152448762077;
  long    = 77.16537114414153;
  adresse = 77.16537114414153;

  mapsURL = `https://maps.google.com/maps?q=${this.lat}%20${this.long}&t=&z=20&ie=UTF8&iwloc=&output=embed`;

  //"https://maps.google.com/maps?q=Brookline%20123%20%NewYork&t=&z=20&ie=UTF8&iwloc=&output=embed"

  url = `https://maps.google.com/maps?q=${this.lat},${this.long}&hl=es&z=14&amp;output=embed`;
  url2 = `https://maps.google.com/maps?q=10.305385,77.923029&hl=es&z=14&amp;output=embed`;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: MapsGeocalisation | undefined,
              private dialogRef: MatDialogRef<MapsGeocalisationComponent>,
              private fb: FormBuilder) {}

  zoom = 12;
  display: any;
  center_pos: google.maps.LatLngLiteral ={
    lat: 0.0,
    lng: 0.0,
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    center: this.center_pos,
  };

  markers: marker[] = []

  ngOnInit() {

    // console.log("*********defaults11111111*********")
    // console.log(this.defaults)
    // console.log("*********defaults22222222*********")

    //if(this.defaults?.latitude){this.positionActuelle('1')}
    if(this.defaults?.adresse){this.positionActuelle('2')}

  }

  moveMap(event: google.maps.MapMouseEvent) {

    if (event.latLng != null) this.center_pos = (event.latLng.toJSON());

  }

  getLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position: any) => {
    //       if (position) {
    //         console.log("Latitude: " + position.coords.latitude +
    //           "Longitude: " + position.coords.longitude);
    //         this.lat = position.coords.latitude;
    //         this.lng = position.coords.longitude;
    //         console.log(this.lat);
    //         console.log(this.lat);
    //       }
    //     },
    //     (error: any) => console.log(error));
    // } else {
    //   alert("Geolocation is not supported by this browser.");
    // }
  }

  move(event: google.maps.MapMouseEvent) {

    if (event.latLng != null) this.display = event.latLng.toJSON();

  }

  save(){

    this.dialogRef.close(this.form.value);

  }

  positionActuelle(modeSearch:any){

    let key_map   = 'AIzaSyA6Y5coVKzNSjn4qXLsWK68T1Rqdoe12FU'
    let set_GeoMap= this.form.value;

    switch (modeSearch) {
      case '1':
        this.mapsURL = `https://maps.google.com/maps?key=${key_map}&q=${set_GeoMap.latitude}%20${set_GeoMap.longitude}&t=&z=20&ie=UTF8&iwloc=&output=embed`;
        break;

      case '2' :
        this.mapsURL = `https://maps.google.com/maps?key=${key_map}&q=${set_GeoMap.adresse}&t=&z=20&ie=UTF8&iwloc=&output=embed`;
        break;

      case '3' :
        this.mapsURL = set_GeoMap.url_maps+'';
        break;

      default:
        navigator.geolocation.getCurrentPosition((position) => {
          this.center_pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.lat  = position.coords.latitude;
          this.long = position.coords.longitude;
          this.mapsURL = `https://maps.google.com/maps?key=${key_map}&q=${this.lat}%20${this.long}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        });
        break;
    }


  }

}
