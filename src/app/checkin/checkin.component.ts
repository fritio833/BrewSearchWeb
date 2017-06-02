import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { CheckinService } from '../checkin.service';

import { CommonService } from '../common.service';

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

  constructor(private route:ActivatedRoute,private check:CheckinService,private com:CommonService) {
    //console.log('params',this.params)
  }

  timeDifference(previous, short?) {

    return this.com.timeDifference(previous,short);

  }

  ngOnInit() {

    this.checkinId = this.route.snapshot.params['id'];
    this.check.getCheckinById(this.checkinId).subscribe(resp=>{      
      this.checkin = resp;
      console.log('checkin',this.checkin);
      setTimeout(()=>{
        this.isLoaded = true;
      },500);
      
    },error=>{
      console.log('error getCheckin',error);
    });
  }

}
