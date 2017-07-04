import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { CheckinService } from '../checkin.service';

import { CommonService } from '../common.service';
import { BrewerydbService} from '../brewerydb.service';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  providers: [CheckinService,CommonService]
})
export class CheckinComponent implements OnInit {

  public checkinId:string;
  public checkin:any;
  public isLoaded:boolean = false;
  public beer:any;

  constructor(private route:ActivatedRoute,
              private check:CheckinService,
              private beerAPI:BrewerydbService,
              private geo:GoogleService,
              private com:CommonService) {
    //console.log('params',this.params)
  }

  timeDifference(previous, short?) {

    return this.com.timeDifference(previous,short);

  }

  goToMap(lat,lng,name) {
      let destination = lat + ',' + lng;
      let label = encodeURIComponent(name);
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');

  }

  showHalfStar(rating) {
    console.log(rating);
    if((rating % 1) > 0.4)
      return true;
    else
      return false;
  }

  ngOnInit() {

    this.checkinId = this.route.snapshot.params['id'];
    this.check.getCheckinById(this.checkinId).subscribe(resp=>{      
      this.checkin = resp;
      console.log('checkin',this.checkin);
      /*
      this.beerAPI.loadBeerById(this.checkin.beerId).subscribe(resp=>{
        console.log('resp',resp);
      });
      */
      setTimeout(()=>{
        this.isLoaded = true;
      },500);
      
    },error=>{
      console.log('error getCheckin',error);
    });
  }

}
