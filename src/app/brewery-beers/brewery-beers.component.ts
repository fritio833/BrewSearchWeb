import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BrewerydbService} from '../brewerydb.service';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-brewery-beers',
  templateUrl: './brewery-beers.component.html',
  styleUrls: ['./brewery-beers.component.css']
})
export class BreweryBeersComponent implements OnInit {

  public showBeers:boolean = false;
  public breweryBeers = [];
  public breweryDdBeers = [];
  public limit:number = 20;
  public showMoreBeers:boolean = false;
  public brewery:any;
  public page:number = 1;

  constructor(private comm:CommonService,
              private beerAPI:BrewerydbService,
              private route:ActivatedRoute) { }


  getBreweryBeers(breweryId) {
    this.beerAPI.loadBreweryBeers(breweryId).subscribe(beers=>{
      console.log('beers',beers);
      //this.breweryBeers = beers.data;

      this.breweryDdBeers = beers.data;
    
      if (this.breweryDdBeers.length > this.limit) {
        this.showMoreBeers = true;

        for (let i=0; i < this.limit; i++ )
          this.breweryBeers.push(this.breweryDdBeers[i]);

      } else {
        this.showMoreBeers = false;
        this.breweryBeers = this.breweryDdBeers;
      }
       

      this.beerAPI.loadBreweryById(breweryId).subscribe(brewery=>{
        console.log('brewery',brewery);
        this.brewery = brewery.data;
        this.showBeers = true;
      },error=>{
        console.log(error);
      });      
    },error=>{
      console.log(error);
    });
  }

  getMoreBeers() {
    this.page++;
    let offset = this.page * this.limit;
    let beerLimit;

    if ( (this.breweryDdBeers.length - offset) < this.limit ) {
      this.showMoreBeers = false;
      beerLimit = this.breweryDdBeers.length;
    } else {
      beerLimit = this.limit + offset;
    }

    console.log('beer limit',beerLimit);
    console.log('offset',offset);
    console.log('beer len',this.breweryDdBeers.length);

    for (var i = offset; i < beerLimit; i++) {
      this.breweryBeers.push(this.breweryDdBeers[i]);
    }
    
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.getBreweryBeers(params.id);
      //console.log('params',params);
    });
  }

}
