
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputNumberChangeObservibalService {
  constructor() {
  }
  static autoIncrement = 0

  public static submitChangeInputObservable = new Subject<number>();
  public static submitChangeInput() {
    this.submitChangeInputObservable.next(this.autoIncrement++);
  }

}