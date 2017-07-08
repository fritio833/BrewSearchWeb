import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";

import { BrewerydbService} from '../brewerydb.service';
import { GoogleService} from '../google.service';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-brewery-results',
  templateUrl: './brewery-results.component.html',
  styleUrls: ['./brewery-results.component.css']
})
export class BreweryResultsComponent implements OnInit {

  public breweries = [];
  public qBrewery:string;
  public msg:string;
  public showFeed:boolean = false;
  public isLocationSearch:boolean = false;
  private subscription:Subscription;
  public lat:number;
  public lng:number;
  public numPages:number = 0;
  public currentPage:number = 1;
  public pageSize:number = 50;
  public totalResults:number = 0;  

  constructor(private beerAPI:BrewerydbService, 
              private geo:GoogleService,
              private common:CommonService,
              public router:Router, 
              private route:ActivatedRoute) { }

  doBrewerySearch() {
    this.msg = null;
   
    if (this.qBrewery.length) {
      this.showFeed = false;
      this.beerAPI.findBreweriesByName(this.qBrewery,this.currentPage).subscribe(resp=>{

        if (!resp.totalResults) {
          this.msg = "No breweries found with the name '"+this.qBrewery+"'.";
          this.breweries = [];
        } else {
          this.msg = null;
          this.beerAPI.setBeerStorage(resp);
          this.breweries = resp.data;
          this.numPages = resp.numberOfPages;
          this.totalResults = resp.totalResults;          
          console.log('breweries',this.breweries);
        }
        this.showFeed = true;

      },error=>{
        console.log('error',error);
        if (error.name === 'TimeoutError')
          this.msg = "No internet connection.";
        this.showFeed = true;
      });
    }
  }

  doCityBrewerySearch(city,state,pid) {
    //console.log('loc',city+' - '+state);
    
    this.geo.placeDetail(pid).subscribe(resp=>{
      //console.log(resp);
      this.lat = resp.result.geometry.location.lat;
      this.lng = resp.result.geometry.location.lng;

      this.beerAPI.findBreweriesByGeo(this.lat,this.lng).subscribe(breweries=>{
        console.log('breweries',breweries);

        if (!breweries.totalResults) {
          this.msg = "No breweries in " + city + ", "+state+".";
          this.breweries = [];
        } else {
          this.msg = null;
          this.breweries = [];
          this.beerAPI.setBeerStorage(breweries);
          //this.breweries = breweries.data;
          for (var i = 0; i < breweries.data.length; i++) {
            breweries.data[i].brewery.type = breweries.data[i].locationTypeDisplay;
            breweries.data[i].brewery.locId = breweries.data[i].id; 
            this.breweries.push(breweries.data[i].brewery);
          }
          console.log('this.breweries',this.breweries);
        }
        this.showFeed = true;

      },error=>{
        console.log('error findBreweriesByGeo',error);
      });
    },error=>{
      console.log('error placeDetail',error);
    });

  }

  onNext() {
    console.log('next');
    this.currentPage++;
    this.router.navigate(['breweries'],{
      queryParams:{q:encodeURI(this.qBrewery),p:this.currentPage}
    });    
  }

  onPrev() {
    console.log('prev');
    this.currentPage--;
    this.router.navigate(['breweries'],{
      queryParams:{q:encodeURI(this.qBrewery),p:this.currentPage}
    });
  }

  goToPage(page) {
    console.log(page);
    this.router.navigate(['breweries'],{
      queryParams:{q:encodeURI(this.qBrewery),p:page}
    });    
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBrewery = queryParam['q'];
      
      if (queryParam['p'] == null)
        this.currentPage = 1;
      else
        this.currentPage = queryParam['p'];
        
      if (this.qBrewery != null) {
        this.isLocationSearch = false;
        this.doBrewerySearch();
      }
    }); 

    this.route.params.subscribe(params=>{
      console.log('params',params);
      if (params.city != null && params.state != null) {
        this.isLocationSearch = true;
        this.doCityBrewerySearch(params.city,params.state,params.pid);
      }
    });       
  }

}
