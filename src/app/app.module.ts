import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { routes } from './app.router';

import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

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
import { CheckinComponent } from './checkin/checkin.component';
import { FeedsComponent } from './feeds/feeds.component';
import { LoaderComponent } from './loader/loader.component';

import { CheckinService } from './checkin.service';
import { CommonService } from './common.service';

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
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontAwesomeModule,
    routes,
    AngularFireDatabaseModule,
    AngularFireAuthModule,    
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot()
  ],
  providers: [
    CheckinService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
