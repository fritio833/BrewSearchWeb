import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";

import { BrewerydbService} from '../brewerydb.service';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-beer-results',
  templateUrl: './beer-results.component.html',
  styleUrls: ['./beer-results.component.css']
})
export class BeerResultsComponent implements OnInit {

  private beers = [];
  private qBeer:string;
  private msg:string;
  public showFeed:boolean = false;
  private subscription:Subscription;
  public numPages:number = 0;
  public currentPage:number = 1;
  public pageSize:number = 50;
  public totalResults:number = 0;

  constructor(private beerAPI:BrewerydbService,
              public router:Router,
              private route:ActivatedRoute,
              private common:CommonService) {}

  ngOnInit() {

    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBeer = queryParam['q'];

      if (queryParam['p'] == null)
        this.currentPage = 1;
      else
        this.currentPage = queryParam['p'];

      console.log('page',this.currentPage);

      this.doBeerSearch();
    });
  }

  onNext() {
    console.log('next');
    this.currentPage++;
    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:this.currentPage}
    });    
  }

  onPrev() {
    console.log('prev');
    this.currentPage--;
    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:this.currentPage}
    });
  }

  goToPage(page) {
    console.log(page);
    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:page}
    });    
  }

  doBeerSearch() {

    this.msg = null;
    if (this.qBeer.length) {
      this.showFeed = false;
      this.beerAPI.findBeerByName(this.qBeer,this.currentPage).subscribe(resp=>{
        console.log('resp',resp);
        if (!resp.totalResults) {
          this.msg = "No beers found with the name '"+this.qBeer+"'.";
          this.beers = [];
        } else {
          this.msg = null;
          this.beerAPI.setBeerStorage(resp);
          this.beers = resp.data;
          this.numPages = resp.numberOfPages;
          this.totalResults = resp.totalResults;
          //console.log('beers',this.beers);
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
}
