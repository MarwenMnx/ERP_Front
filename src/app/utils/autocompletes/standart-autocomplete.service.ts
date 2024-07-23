import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandartAutocompleteService {
  constructor() { }
  static autoIncrement = 0
  public static submitFormulaireObservable = new Subject<number>();
  public static submitFormAutocomplete() {
    this.submitFormulaireObservable.next(this.autoIncrement++);
  }
}
