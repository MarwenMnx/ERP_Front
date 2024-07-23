import {
  Component,

  Input,
  OnInit,
  SimpleChanges,

} from '@angular/core';
import {

  FormsModule,
  ReactiveFormsModule,

} from '@angular/forms';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

import WebDataRocks from 'webdatarocks';
import { ActivatedRoute, Router } from '@angular/router';
import { DataParamRoute } from 'src/app/erp_documents_vente/models/data.model';
import { hideLoading, showLoading } from 'src/app/global-functions';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { TableCroiseeUpdateComponent } from './table-croisee-update/table-croisee-update.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'vex-table-croisee',
  templateUrl: './table-croisee.component.html',
  styleUrls: ['./table-croisee.component.scss'],
  standalone: true,
  imports: [

    MatButtonToggleModule,
    ReactiveFormsModule,
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
    FormsModule,
    MatDialogModule,
    MatInputModule,
    // TableCroiseeUpdateComponent
  ]
})
export class TableCroiseeComponent implements OnInit {

  toolbarTitle : string = '' ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  @Input() tableId: string = '';
  @Input() columns: any = [];
  @Input() measures: any = [];
  @Input() options: any = [];
  @Input() title: string = '';
  // @Input() toolbarTitle: any = '';

  // @Input() jsonData: any[] | undefined; 
  @Input() jsonData: any[] = [];
  @Input() dataSource: any = []; // Accepts jsonData as input
  @Input() rows: any = [];
  @Input() fields: string = ''; // add this fields to control selected data
  dataParams: DataParamRoute = new DataParamRoute();


  ngOnInit() {
   
    showLoading()
    console.log('====================================');
    console.log("-------columns----------", this.columns);
    console.log("----------rows-------", this.rows);
    console.log('====================================');
    this.route.data.subscribe((data: any) => {
      this.dataParams = data; // Accessing the 'title' from the route data
    });
  }
  public ngAfterViewInit(): void {
    console.log('==============jsonnnData======================');
    console.log("------------", this.jsonData);
    console.log('====================================');
    this.renisialiserData()
  }

  ngOnChanges(changes: SimpleChanges) {
    try{
      let changes2:any = changes
      if (changes2.jsonData.currentValue) {
        this.renisialiserData()
      }
    }catch(e){}
  }

  renisialiserData() {
    setTimeout(() => {
      // @ts-ignore
      const pivotTable = new WebDataRocks({
        container: `#${this.tableId}`,
        beforetoolbarcreated: customizeToolbar,
        width: 1100,
        height: 500,
        toolbar: true,
        // beforetoolbarcreated: (toolbar: any) => { },
        global: {
          options: {
            grid: {
              type: 'classic',
              title:this.title,
              showReportFiltersArea: true,
              showHeaders: false, // hidden number in border of the table
            },
            configuratorButton: true,
            // drillThrough: true,
          },
        },
        report: {
          dataSource: {
            data: (this.jsonData)
          },
          slice: {
            rows: this.rows,
            columns: this.columns,
            measures: this.measures,

          },
         
        },
        customizeCell: (cellBuilder: any, cellData: any) => { }
       
      });
      function customizeToolbar(toolbar: any) {

        // toolbar.getTabs().tabstrip.append('<div>' + this.title + '</div>');

        // Get all tabs from the toolbar
        
        const tabs = toolbar.getTabs();
        toolbar.getTabs = function () {
          // Delete the first tab
          delete tabs[0];
          delete tabs[1];
          delete tabs[2];
          delete tabs[4];
          delete tabs[5];
          delete tabs[6];
          return tabs;
        }
      }

      const getData = () => {
        pivotTable.getData(
          {},
          (rawData: { data: any[] }) => {
            console.log(111, rawData);
            hideLoading()
            const labels: any[] = [];
            const data: any[] = [];
            rawData.data.forEach(
              (item: {
                hasOwnProperty: (arg0: string) => any;
                r0: any;
                v0: any;
                v1: any;
              }) => {
                if (item.hasOwnProperty('r0')) {
                  labels.push(item.r0);
                  data.push(item.v0 || item.v1);
                }
              }
            );
          },

          (error: any) => {
            console.error(error);
            hideLoading()
          }
        );
      };
      getData();
    }, 3000);
  }



}


