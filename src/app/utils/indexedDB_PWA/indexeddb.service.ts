import { Injectable } from '@angular/core';
import { Observable, Observer, ReplaySubject, Subject } from 'rxjs';
import { take, filter } from 'rxjs/operators';

const VERSION = 1;
interface Record {
  key: string;
  value: any;
  ttl: number;
  timestamp: number;
}
type RecordInput = Omit<Record, 'timestamp'>;
@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {

  db = new ReplaySubject<IDBDatabase | null>(1);
  $db = this.db.pipe(take(1), filter(db => !!db));
  nameDB = "mystore";
  constructor() {
    const onError = (error: any) => {
      console.log(error);
      this.db.complete();
    };
    if (!window.indexedDB) {
      onError('IndexedDB not available');
    } else {
      const openRequest = indexedDB.open('myapp', VERSION);
      openRequest.onerror = () => onError(openRequest.error);
      openRequest.onsuccess = () => this.db.next(openRequest.result);
      openRequest.onupgradeneeded = () => {
        try {
          const db: IDBDatabase = openRequest.result;
          const surveyCacheStore = db.createObjectStore(this.nameDB, { keyPath: 'key' });
          surveyCacheStore.createIndex('value', 'value');
          surveyCacheStore.createIndex('timestamp', 'timestamp');
          surveyCacheStore.createIndex('ttl', 'ttl');
        } catch (error) {
          onError(error);
        }
      };
    }
  }

  get(storeName: string, key: string): Observable<Record | null> {
    return Observable.create((observer: Observer<Record>) => {
      const onError = (error: any) => {
        console.log(error);
        observer.complete();
      };
      this.$db.subscribe(db => {
        try {
          if (db != null) {
            const txn = db.transaction([storeName], 'readonly');
            const store = txn.objectStore(storeName);
            const getRequest: IDBRequest<Record> = store.get(key);
            getRequest.onerror = () => onError(getRequest.error);
            getRequest.onsuccess = () => {
              const record: any = getRequest.result;
              if (!record ||
                new Date(Date.now() - record.timestamp).getSeconds() > record.ttl
              ) {
                observer.next(record);//observer.next(null);
              } else {
                observer.next(getRequest.result);
              }
              observer.complete();
            };
          }

        } catch (err) {
          onError(err);
        }
      });
    });
  }

  put(storeName: string, value: RecordInput): Observable<IDBValidKey | null> {
    return Observable.create((observer: Observer<IDBValidKey>) => {
      const onError = (error: any) => {
        console.log(error);
        observer.complete();
      };
      this.$db.subscribe(db => {
        try {
          if (db != null) {
            const txn = db.transaction([storeName], 'readwrite');
            const store = txn.objectStore(storeName);
            const record: Record = { ...value, timestamp: Date.now() };
            const putRequest = store.put(record);
            putRequest.onerror = () => onError(putRequest.error);
            putRequest.onsuccess = () => {
              observer.next(putRequest.result);
              observer.complete();
            };
          }

        } catch (err) {
          onError(err);
        }
      });
    });
  }

  clear(storeName: string): Observable<IDBValidKey | null> {
    return Observable.create((observer: Observer<IDBValidKey>) => {
      const onError = (error: any) => {
        console.log(error);
        observer.complete();
      };
      this.$db.subscribe(db => {
        try {
          if (db != null) {

            const request = db.transaction(this.nameDB, 'readwrite')
              .objectStore(this.nameDB).clear();
            //.delete(storeName);
            // const txn = db.transaction([storeName], 'readwrite');
            // const store = txn.objectStore(storeName);
            //
            // const putRequest = store.delete(storeName);
            // putRequest.onerror = () => onError(putRequest.error);
            // putRequest.onsuccess = () => {
            //   //observer.next(putRequest.result);
            //   //observer.complete();
            // };
          }

        } catch (err) {
          onError(err);
        }
      });
    });
  }

  clearIndexedDB() {
    this.clear('mystore')
      .subscribe(
        x => { },
        err => {
          console.log(`ERROR: ${err}`);
        }
      );
  }

  putIndexedDB(set_key: any, set_value: any, set_ttl: any) {
    this.put('mystore', { key: set_key, value: set_value, ttl: set_ttl })
      .subscribe(
        x => {
        },
        err => {
          console.log(`ERROR: ${err}`);
        }
      );
  }

  async getIndexedDB(set_key: any) {
    return new Promise((resolve) => {

      //this.result_db = ''
      this.get('mystore', set_key)
        .subscribe(
          x => {

            if (x?.value != null) {
              const itemsData = JSON.parse(JSON.stringify(x?.value));
              resolve(itemsData)
            } else {
              resolve(null)
            }
            resolve(null)
          },
          err => {
            resolve(null)
          }
        );

    });

    /*
    this.resultDB = 'storing...';
    let result_db = '';
    this.indexedDb.get('mystore', set_key)
      .subscribe(
        x => {
          this.resultDB = `FOUND: ${JSON.stringify(x)}`;
          result_db = JSON.stringify(x!=null ? JSON.stringify(x.value) : '');
        },
        err => {
          this.resultDB = `ERROR: ${err}`;
          console.log(set_key+ " >>>>> Errrr Indexed ->>>> "+`ERROR: ${err}`)
        }
      );
    console.log(set_key+ " >>>>> Indexed ->>>> "+this.resultDB)
    return result_db;
*/
  }

}
