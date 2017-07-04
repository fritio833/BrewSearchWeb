import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrewerydbService} from '../brewerydb.service';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {

  public showBeer:boolean = false;
  public beerId:string;
  public beer:any;
  public beerSRM:string;
  public randomBeers = [];

  constructor(private beerAPI:BrewerydbService,
              private route:ActivatedRoute,
              private com:CommonService,
              public router:Router) {}

  getBeer(beerId) {

    this.beerAPI.loadBeerById(beerId).subscribe(beer=>{
      this.beer = beer.data;

      console.log('Hello',this.beer);

      if ("srm" in this.beer) {
        this.beerSRM = '#'+this.beer.srm.hex;
        //console.log('srm',this.beerSRM);
      }

      this.beerAPI.getRandomBeerByStyle(this.beer.style.id).subscribe(style=>{
        //console.log('style',style);
        if (style.totalResults)
          this.randomBeers = style.data;

      },error=>{
        console.log('error',error);
      });

      this.showBeer = true;
    },error=>{
      console.log('error',error);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.getBeer(params.id);
    });
  }

}
