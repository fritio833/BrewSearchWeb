import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
  providers: [CommonService]
})
export class FeedsComponent implements OnInit {

  public checkins:Observable<any>;
  public showFeed:boolean = false;
  public environment = 'prod';

  constructor(public db: AngularFireDatabase, public com: CommonService) {}



  timeDifference(previous, short?) {

    return this.com.timeDifference(previous,short);

  }

  ngOnInit() {
   
    this.checkins = this.db.list('checkin/feeds',{
      query:{
        orderByChild:'priority',
        limitToFirst: 20
      }
    }).map(_checkins=>{
      _checkins.map(checkin=>{
        this.db.object('users/'+checkin.uid).subscribe(user=>{
          checkin.user = user;
        });
        return checkin;
      });
      return _checkins;
    },error=>{
      console.log(error);
    });

    this.checkins.subscribe(resp=>{

      setTimeout(()=>{
        this.showFeed = true;
      },500);
    },error=>{
      console.log(error);
    });    
  }


}
