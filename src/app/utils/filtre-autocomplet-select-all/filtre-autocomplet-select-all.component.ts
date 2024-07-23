import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { MatButtonModule } from '@angular/material/button';
//import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AsyncPipe, NgClass, NgFor, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {VexPageLayoutComponent} from "@vex/components/vex-page-layout/vex-page-layout.component";
import {VexPageLayoutHeaderDirective} from "@vex/components/vex-page-layout/vex-page-layout-header.directive";
import {VexBreadcrumbsComponent} from "@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {VexPageLayoutContentDirective} from "@vex/components/vex-page-layout/vex-page-layout-content.directive";

import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ChipsAutocompleteComponent} from "../filtre-catg-famille-sous-famille/chips-autocomplete/chips-autocomplete.component";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'vex-filtre-autocomplet-select-all',
  templateUrl: './filtre-autocomplet-select-all.component.html',
  styleUrls: ['./filtre-autocomplet-select-all.component.scss'],
  standalone: true,
  imports: [
   // MatButtonModule,
   // MatCheckboxModule,
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,MatInputModule,
   ]
})
export class FiltreAutocompletSelectAllComponent {

  @Input() get_List_data: any;
  @Input() labelText: any = "Catégorie tiers";

  title = "mat-select-search";
/*
  city  = [
    {
      _id: 1, value: 'Value 1' , selected:false ,
    },
    {
      _id: 2, value: 'Value 2', selected:false ,
    },
    {
      _id: 3, value: 'Value 3', selected:false ,
    },
    {
      _id: 4, value: 'Value 4', selected:false ,
    }
  ];
  */
  @Input() isSelectedItems:any =[] ;//; this.city;
  @Input() selectedDatas:any =[] ;//; this.city;
  @Input() selectedKey:any  ='_id';      //; this.city;
  @Input() selectedVal:any  ='libelle';  //; this.city;

  @Output() selectedList = new EventEmitter<any>();

  returnList:any = []
  listSelectItems:any = []

  city:any = []

  searchDataForm:any;// FormGroup;

  @ViewChild('allSelected') private allSelected:any;// MatOptionModule;

  ngOnChanges(changes: SimpleChanges) {
    try {
      if (changes['selectedDatas']) {
        this.city = this.selectedDatas
      }

      if(changes['isSelectedItems'] && changes['isSelectedItems'].currentValue != this.isSelectedItems){
      //if(changes['isSelectedItems']){ 
        setTimeout(() => {
          this.toggleSelectedItems()
        })
      }
    } catch (e) {
      console.log("Erruer : FiltreAutocompletSelectAllComponent >>> : " + e)

    }
  }

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.searchDataForm = this.fb.group({
      dataType: new FormControl('')
    });
    this.city = this.selectedDatas
    this.toggleSelectedItems()
  }

  search(value: string) {
   // this.city = this.selectedDatas
    let filter = value.toLowerCase();
    // console.log("filter >>> : " , filter)

    return this.city.filter((optionK:any) =>
      optionK[this.selectedVal].toLowerCase().indexOf(filter) >= 0
      // optionK.value.toLowerCase().indexOf(filter) >= 0
    );
  }

  onKeyFiltre(eventTarget: any) {
    this.selectedDatas = this.search(eventTarget.value);
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.searchDataForm.controls.dataType
        .patchValue([...this.selectedDatas.map((item:any) => item[this.selectedKey]), 0]);
    } else {
      this.searchDataForm.controls.dataType.patchValue([]);
    }
  }

  toggleSelectedItems() {
    if(this.isSelectedItems != undefined){
      if(this.isSelectedItems.length > 0 ){
        // console.log("this.isSelectedItems 11>>> : " , this.isSelectedItems)
        this.searchDataForm.controls.dataType
          .patchValue([...this.isSelectedItems.map((item:any) => item[this.selectedKey]), 0]);
      }else{
        // console.log("this.isSelectedItems 22>>> : " , this.isSelectedItems)
        this.isSelectedItems = []
        this.searchDataForm.controls.dataType.patchValue([...this.isSelectedItems.map((item:any) => item[this.selectedKey]), 0]);
        this.searchDataForm = this.fb.group({
          dataType: new FormControl('')
        });
      }
    }
  }

  row_existeClient: boolean = false;
  onEnterObject(event: any, evt: any){
    //if(!event.source._selected) return
    const selectedState =  this.returnList.findIndex((state:any) =>
      state[this.selectedKey]==evt[this.selectedKey]);

    // console.log("evt >>> : " , evt)
    // console.log("selectedState >>> : " , selectedState)

    if(selectedState== -1 && event.source._selected){
      this.returnList.push(evt)
      this.selectedList.emit(this.returnList)
      this.listSelectItems = this.returnList
    }else if(selectedState > -1 && !event.source._selected){
      this.returnList.splice(selectedState, 1);
      this.selectedList.emit(this.returnList)
      this.listSelectItems = this.returnList
    }

    //console.log("this.selectedDatas 11>>> : " , this.listSelectItems)
    // // console.log("onKeyFiltre 111111>>>>>>>>")
    // this.searchDataForm.controls.dataType
    //   .patchValue([...this.listSelectItems.map((item:any) => item[this.selectedKey]), 0]);
  }


}
