import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  onDeactivate() {
      document.body.scrollTop = 0;
  }  
}
