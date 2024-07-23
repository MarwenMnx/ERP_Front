import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';

import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';

import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
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
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { hideLoading, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { Output, EventEmitter } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'vex-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
  standalone: true,
  imports: [
    ScrollingModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
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
    MatInputModule,
  ]
})
export class ChipsAutocompleteComponent implements OnChanges {

  @Input() libelle:string  = "Libelle"
  @Input() keyOfForm:string  = "Libelle"
  @Input() libelleDisplayed:string  = "libelle"

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  addNewItem() {
    this.newItemEvent.emit([this.keyOfForm, this.items]);
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredItems: Observable<any[]>;
  @Input() items: any[] = [];
  @Input() allItems: any[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('autocompleteTrigger') matACTrigger!: MatAutocompleteTrigger;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredItems = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any) => (fruit ? this._filter(fruit) : this.allItems.slice())),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] || changes['allItems']) {
      this.filteredItems = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: any) => (fruit ? this._filter(fruit) : this.allItems.slice())),
      );
    }
  }

  add(event: MatChipInputEvent): void {
   /* const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.items.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);*/
  }

  remove(fruit: any): void {
    
    this.items.splice(this.items.findIndex(
      (existingItem:any) => existingItem._id === fruit._id
    ), 1);
    this.announcer.announce(`Removed ${fruit}`);
    this.addNewItem()
    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    /*this.items.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);*/
   
      //this.matACTrigger.closePanel()
    
  }

  private _filter(value: string): string[] {
    let filterValue = ""

    try{
      filterValue = value.toLowerCase();
    }catch(e){}

    return this.allItems.filter((item:any) => item[this.libelleDisplayed].toLowerCase().includes(filterValue));
  }

  public getValue(item:any){
    return item[this.libelleDisplayed]
  }

  onEnter(event: any, item: any){
   
    if(!event.source._selected) return
    
    if (item) {
      if(!this.getCheckedItem(item)){
        this.items.push(item);
        this.addNewItem()
      }else{
        this.remove(item);
      }
    }

    // Clear the input value
    //event.chipInput!.clear();
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    // keep the autocomplete opened after each item is picked.
    /*requestAnimationFrame(()=>{
      this.openAuto(this.matACTrigger);
    })*/
  }

  getCheckedItem(item:any){
    if(this.items.find((x:any) => x._id == item._id))
    return true

    return false
  }
  
  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    //this.fruitInput.nativeElement.focus();
    console.log(trigger);
  }

}
