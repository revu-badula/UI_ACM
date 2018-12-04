import { Component } from '@angular/core';
import { OktaAuthService } from './okta/oka.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private okta: OktaAuthService)
  {
   // this.okta.isAuthenticated();
  }
}
