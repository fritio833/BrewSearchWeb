import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrewerydbService} from '../brewerydb.service';
import { Observable } from 'rxjs/Observable';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'rxjs/add/observable/forkJoin';

import { GoogleService} from '../google.service';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.css']
})
export class BreweryDetailComponent implements OnInit {

  public breweryId:string;
  public showBrewery:boolean = false;
  public brewery:any;
  public breweryBeers = [];
  public showBeerList:boolean = false;
  public locationPhotos = [];
  public locationReviews = [];
  public location = {};
  public showPhotos = false;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public locationRating:number = null;

  constructor(private beerAPI:BrewerydbService,
              private route:ActivatedRoute,
              private geo:GoogleService,
              private common:CommonService,
              public router:Router) { }

  getBrewery(breweryId) {


    this.beerAPI.loadBreweryById(breweryId).subscribe(brewery=>{
      
     
      this.brewery = brewery.data;
      console.log('brewery',this.brewery);

      this.beerAPI.loadBreweryBeers(breweryId).subscribe(beers=>{
        this.showBrewery = true;
        console.log('beers',beers);
        this.breweryBeers = beers.data;

        if ("locations" in this.brewery) {
          this.geo.getPlaceFromGoogleByLatLng(this.brewery.name,
                                              this.brewery.locations[0].latitude,
                                              this.brewery.locations[0].longitude).subscribe(resp=>{
            console.log('resp',resp);
            this.location = resp['result'];

            if ("photos" in this.location) {
              this.locationPhotos = this.location['photos'];
              //console.log('photos',this.locationPhotos);
            }

            if ("reviews" in this.location) {
              this.locationReviews = this.location['reviews'];
              //console.log('reviews',this.locationReviews);
            }

            if ("rating" in this.location) {
              this.locationRating = this.location['rating'];
            }

          },error=>{
            console.log(error);
          });
        }
        //this.geo.getPlaceFromGoogleByLatLng(this.brewery.name,)

      });

    },error=>{
      console.log('error getBrewery',error);
    });
  }

  showBeers() {
    this.showBeerList = true;
  }

  showAllPhotos() {

    let observableBatch = [];
    for (let i = 1; i < this.locationPhotos.length; i++) {
      observableBatch.push(this.geo.placePhotos(this.locationPhotos[i].photo_reference,100));
    }

    Observable.forkJoin(observableBatch).subscribe(photos=>{
      console.log('photos',photos);
      this.setSlideShow(photos);
      this.showPhotos = true;
    },error=>{
      console.log(error);
      this.showPhotos = false;
    });
    
    /*
    this.getPlacePhotos().then(success=>{
        this.showPhotos = true;
    }).catch(error=>{
      console.log('error ShowAllPhotos',error);
    });
    */

  }

  setSlideShow(photos) {

    let picObj = [];

    this.galleryOptions = [
        {
            height: '100px',
            thumbnailsColumns: 4,
            image: false,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '100px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 10,
            thumbnailMargin: 10,
            thumbnailsSwipe:true
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false
        }
    ];

    for (var i = 0; i < photos.length; i++) {
      //this.geo.setPhotoSize(photos[i].url,300,200);
      picObj.push({
        small:this.geo.setPhotoSize(photos[i].url,300,200),
        medium:this.geo.setPhotoSize(photos[i].url,500,500),
        big:this.geo.setPhotoSize(photos[i].url,1000,1000)
      });
    }

    this.galleryImages = picObj;
    console.log(this.galleryImages);
  }  

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.getBrewery(params.id);
    });
  }


}
