import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckinService {

  log() {
    console.log('bla bla hit squad');
  }

  constructor(public db: AngularFireDatabase) { }

  getCheckinById(key) {
    return new Observable(observer=>{
      let _checkin = this.db.object('checkin/feeds/'+key).map(checkin=>{

          this.db.object('users/'+checkin.uid).subscribe(user=>{
            checkin.user = user;
          });

        return checkin;      
      });

      _checkin.subscribe(resp=> {
        observer.next(resp);
      },error=>{
        observer.error(error);
      });
    });
  }

}
