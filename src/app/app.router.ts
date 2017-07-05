import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { GetappComponent } from './getapp/getapp.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FaqComponent } from './faq/faq.component';
import { FeedsComponent } from './feeds/feeds.component';
import { CheckinComponent } from './checkin/checkin.component';
import { BeerResultsComponent } from './beer-results/beer-results.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BreweryResultsComponent } from './brewery-results/brewery-results.component';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { BreweryLocationComponent } from './brewery-location/brewery-location.component';
import { PlaceComponent } from './place/place.component';
import { PlaceResultsComponent } from './place-results/place-results.component';
import { BreweryBeersComponent } from './brewery-beers/brewery-beers.component';

export const router: Routes = [
  { path:'',component:HomeComponent},  
  { path:'about',component:AboutComponent},
  { path:'home',component:HomeComponent},
  { path:'contact',component:ContactComponent},
  { path:'getapp',component:GetappComponent},
  { path:'privacy',component:PrivacyComponent},
  { path:'faq',component:FaqComponent},
  { path:'feeds',component:FeedsComponent},
  { path:'checkin/:id',component:CheckinComponent},
  { path:'terms',component:TermsComponent},
  { path:'beers',component:BeerResultsComponent},
  { path:'breweries',component:BreweryResultsComponent},
  { path:'breweries/:city/:state/:pid',component:BreweryResultsComponent},
  { path:'brewery/:id',component:BreweryDetailComponent},
  { path:'brewery/:breweryName/:id',component:BreweryDetailComponent},
  { path:'brewery-location/:breweryName/:id',component:BreweryLocationComponent},
  { path:'brewery-location/:id',component:BreweryLocationComponent},
  { path:'brewery-beers/:breweryName/:id',component:BreweryBeersComponent},
  { path:'beer/:id',component:BeerDetailComponent},
  { path:'bars/:city/:state',component:PlaceResultsComponent},
  { path:'bars/:city/:state/:token',component:PlaceResultsComponent},
  { path:'bar/:id',component:PlaceComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);