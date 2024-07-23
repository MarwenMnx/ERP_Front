import { EventEmitter,Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  public username = new EventEmitter<string>();

}
