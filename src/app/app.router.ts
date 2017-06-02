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
  { path:'terms',component:TermsComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);