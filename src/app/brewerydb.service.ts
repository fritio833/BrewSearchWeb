import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retryWhen';

@Injectable()
export class BrewerydbService {

  public breweryDbAPI:any;
  public breweryDbUrl:any;
  public beerStorage:any; 

  constructor(public http: Http) { 
    this.breweryDbAPI = '3c7ec73417afb44ae7a4450482f99d70';

    if (environment.production)
      this.breweryDbUrl = 'http://api.brewerydb.com/';
    else
      this.breweryDbUrl = '/api/';
  }

  findBeerByName(name,page?) {

    let _page = '';

    if (page != null)
      _page = '&p='+page;

    return this.http.get(this.breweryDbUrl 
    + 'v2/search/?key=' 
    + this.breweryDbAPI 
    + '&q=' + name
    + _page
    + '&withBreweries=Y&type=beer')
    .retryWhen(error => error.delay(500))
    .timeout(30000)
    .map(res => res.json());
  }

  findBreweriesByName(name,page?) {

    let _page = '';

    if (page != null)
      _page = '&p='+page;

    return this.http.get(this.breweryDbUrl 
    + 'v2/search/?key=' 
    + this.breweryDbAPI 
    + '&q=' + name
    + _page
    + '&withLocations=Y&type=brewery')
    .retryWhen(error => error.delay(500))
    .timeout(30000)
    .map(res => res.json());
  }

  findBreweriesByCity(city,state) {
    return this.http.get(this.breweryDbUrl 
    + 'v2/locations/?key=' 
    + this.breweryDbAPI 
    + '&region=' + state
    + '&countryIsoCode=US')
    .retryWhen(error => error.delay(500))
    .timeout(30000)
    .map(res => res.json());
  }  

  loadBeerById(beerId)  {

    return this.http.get(this.breweryDbUrl 
    + 'v2/beer/' 
    + beerId 
    + '/?key=' + this.breweryDbAPI
    + '&type=beer&withBreweries=Y&withSocialAccounts=Y&withIngredients=Y')
    .retryWhen(error => error.delay(500))
    .timeout(30000)         
    .map(res => res.json());
  }

  findBreweriesByGeo(lat,lng,radius?) {
    let _radius = 25;

    if (radius != null) {
      _radius = radius;
    }

    return this.http.get(this.breweryDbUrl 
    + 'v2/search/geo/point?lat='
    + lat
    + '&lng='
    + lng
    + "&radius=" + _radius 
    + '&key='           
    + this.breweryDbAPI)
    .retryWhen(error => error.delay(500))
    .timeout(30000)           
    .map(res => res.json());
  }  

  loadBreweryLocations(breweryId) {
    return this.http.get(this.breweryDbUrl 
    + 'v2/brewery/'+breweryId+'/locations'
    + '/?key=' + this.breweryDbAPI)
    .retryWhen(error => error.delay(500))
    .timeout(30000)         
    .map(res => res.json());
  }

  loadLocationById(locationId) {
    return this.http.get(this.breweryDbUrl 
    + 'v2/location/'+locationId
    + '/?key=' + this.breweryDbAPI)
    .retryWhen(error => error.delay(500))
    .timeout(30000)          
    .map(res => res.json());
  }

  loadBreweryBeers(breweryId) {
    return this.http.get(this.breweryDbUrl 
    + 'v2/brewery/' 
    + breweryId 
    + '/beers?key=' + this.breweryDbAPI)
    .retryWhen(error => error.delay(500))
    .timeout(30000)          
    .map(res => res.json()); 
  }  

  loadBreweryById(breweryId) {
    return this.http.get(this.breweryDbUrl 
    + 'v2/brewery/'+breweryId
    + '/?key=' + this.breweryDbAPI
    + '&withLocations=Y&withSocialAccounts=Y')
    .retryWhen(error => error.delay(500))
    .timeout(30000)          
    .map(res => res.json());
  } 

  beerEvents(beerId)  {

    return this.http.get(this.breweryDbUrl 
         + 'v2/beer/' 
         + beerId 
         + '/events?key=' + this.breweryDbAPI)
         .retryWhen(error => error.delay(500))
         .timeout(30000)         
         .map(res => res.json());
  }

  getRandomBeerByStyle(styleId) {

    return this.http.get(this.breweryDbUrl 
           + 'v2/beers/?key=' 
           + this.breweryDbAPI
           + '&styleId='
           + styleId
           +'&randomCount=10&availableId=1&order=random&withBreweries=Y')
           .retryWhen(error => error.delay(500))
           .timeout(30000)
           .map(res => res.json());      
  }  


  setBeerStorage(data) {
    this.beerStorage = data;
  }
}
