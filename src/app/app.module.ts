import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { routes } from './app.router';
import { NgxGalleryModule } from 'ngx-gallery';

import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { StarRatingModule } from 'angular-star-rating';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { GetappComponent } from './getapp/getapp.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FaqComponent } from './faq/faq.component';
import { SearchComponent } from './search/search.component';
import { CheckinComponent } from './checkin/checkin.component';
import { FeedsComponent } from './feeds/feeds.component';
import { LoaderComponent } from './loader/loader.component';
import { BeerResultsComponent } from './beer-results/beer-results.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BreweryResultsComponent } from './brewery-results/brewery-results.component';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { BreweryLocationComponent } from './brewery-location/brewery-location.component';
import { PlaceComponent } from './place/place.component';
import { PlaceResultsComponent } from './place-results/place-results.component';
import { BreweryBeersComponent } from './brewery-beers/brewery-beers.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { PaginationComponent } from './pagination/pagination.component';

import { CheckinService } from './checkin.service';
import { CommonService } from './common.service';
import { BrewerydbService } from './brewerydb.service';
import { GoogleService } from './google.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    GetappComponent,
    PrivacyComponent,
    TermsComponent,
    FeedsComponent,
    CheckinComponent,
    FaqComponent,
    SearchComponent,
    LoaderComponent,
    BeerResultsComponent,
    BeerDetailComponent,
    BreweryResultsComponent,
    BreweryDetailComponent,
    BreweryLocationComponent,
    BreweryBeersComponent,
    PlaceComponent,
    PlaceResultsComponent,
    ReadMoreComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    NgxGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google.googleMapsAPIKey
    }),    
    FormsModule,
    HttpModule,
    Angular2FontAwesomeModule,
    routes,
    AngularFireDatabaseModule,
    AngularFireAuthModule,    
    AngularFireModule.initializeApp(environment.firebase),
    StarRatingModule,
    NgbModule.forRoot()
  ],
  providers: [
    CheckinService,
    CommonService,
    BrewerydbService,
    GoogleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
