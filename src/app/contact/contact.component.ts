import { Component, OnInit } from '@angular/core';
//import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //public users:FirebaseListObservable<any[]>;
  //public users = [];
  //constructor(db: AngularFireDatabase) {
  constructor() {  
    //this.users = db.list('users');
    //console.log('users list',this.data);
    
    /*
    this.data.subscribe(resp=>{
      this.users = resp;
      console.log('resp',resp);
    });
    */
  }

  ngOnInit() {
  }

}
