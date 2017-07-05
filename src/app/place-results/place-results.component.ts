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
  showPrevious:boolean = false;
  city:string;
  state:string;

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

  getPrevious() {
    window.scrollTo(0,0);
    window.history.back();
  }

  getMoreLocations(nextToken) {
    this.showPlaces = false;
    window.scrollTo(0,0);
    this.geo.searchByPlaceTypeNextToken(nextToken).subscribe(resp=>{
      console.log('resp',resp);

      if ("next_page_token" in resp)
        this.nextToken = resp.next_page_token;
      else
        this.nextToken = null;

      if ("results" in resp) {
        this.locations = resp.results;

      this.showPlaces = true;
        /*
        if (resp.results.length) {
          for (var i = 0; i < resp.results.length; i++ ) {
            this.locations.push(resp.results[i]);
          }
        }
        */
      }


    },error=>{
      console.log(error);
    });
  }

  getNextPlaces() {
    this.router.navigate(['bars/'
                          +this.city
                          +'/'+this.state
                          +'/'+this.nextToken]);
  }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      console.log('params',params);
      
      if (params.city != null && params.state != null && params.token != null) {
        this.getMoreLocations(params.token);
        this.city = params.city;
        this.state = params.state;
        this.showPrevious = true;
      } else if (params.city != null && params.state != null) {
        //this.isLocationSearch = true;
        this.city = params.city;
        this.state = params.state;
        this.showPrevious = false;        
        this.doCitySearch(params.city,params.state);
      }
    });       
  }

}
