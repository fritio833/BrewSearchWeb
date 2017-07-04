import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GoogleService} from '../google.service';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-place-results',
  templateUrl: './place-results.component.html',
  styleUrls: ['./place-results.component.css']
})
export class PlaceResultsComponent implements OnInit {

  locations = [];
  nextToken:string;
  showPlaces:boolean = false;

  constructor(public router:Router,
              private route:ActivatedRoute,
              public common:CommonService,
              public geo:GoogleService) { }

  doCitySearch(city,state) {
    let txtSearch = encodeURI('bars in '+city+' '+state);
    this.geo.searchByPlaceType(txtSearch).subscribe(resp=>{
      if ("results" in resp)
        this.locations = resp.results;

      if ("next_page_token" in resp)
        this.nextToken = resp.next_page_token;

      this.showPlaces = true;
      console.log('resp',resp);
    },error=>{
      console.log(error);
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      console.log('params',params);
      if (params.city != null && params.state != null) {
        //this.isLocationSearch = true;
        this.doCitySearch(params.city,params.state);
      }
    });       
  }

}
