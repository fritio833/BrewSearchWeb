import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'rxjs/add/observable/forkJoin';

import { GoogleService} from '../google.service';
import { CommonService} from '../common.service';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  public placeId:string;
  public showLocation:boolean = false;
  public location:any;
  public locationPhoto:any;
  public placeTypes = [];
  public locationPhotosArray = [];
  public locationPhotos = [];
  public showPhotos:boolean = false;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];  

  constructor(private geo:GoogleService,
              private route: ActivatedRoute,
              public router:Router,
              public common:CommonService) { }

  getPlaceDetail(placeId) {
    this.geo.placeDetail(placeId).subscribe(place=>{
      this.showLocation = true;
      this.location = place.result;

      if ("photos" in this.location) {
        this.geo.placePhotos(this.location.photos[0].photo_reference,280).subscribe(photo=>{
          console.log('photo',photo);
          this.locationPhoto = photo.url;
        },error=>{
          console.log(error);
          this.showLocation = false;
        });
      }

      // get photo array
      if (this.location.hasOwnProperty('photos')) {
        this.locationPhotosArray = this.location.photos;
      }       

      for (var i=0; i < this.location.types.length; i++) {
        if (this.location.types[i]!='establishment' && this.location.types[i]!='point_of_interest')
          this.placeTypes.push(this.location.types[i]);
      }


      console.log(place);
    },error=>{
      console.log(error);
      this.showLocation = false;
    });
  }

  showAllPhotos() {

    let observableBatch = [];
    for (let i = 1; i < this.locationPhotosArray.length; i++) {
      observableBatch.push(this.geo.placePhotos(this.locationPhotosArray[i].photo_reference,100));
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

  showHalfStar(rating) {
    //console.log(rating);
    if((rating % 1) > 0.4)
      return true;
    else
      return false;
  }

  getPlacePhotos() {
    /*
        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];
    */    
    return new Promise(resolve => {

      for (let i = 1; i < this.locationPhotosArray.length; i++) {

        this.geo.placePhotos(this.locationPhotosArray[i].photo_reference).subscribe((photo)=>{
            this.locationPhotosArray[i]['url'] = photo.url;
            this.locationPhotos.push(photo.url);
            if (i == (this.locationPhotosArray.length-1))
              resolve(true);
        },error=>{
          console.log('error',error);
        });
      }
    });
  }  

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =  month + '/'+date + '/' + year;
    return time;
  }  

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.getPlaceDetail(params.id);
    });
  }

}
