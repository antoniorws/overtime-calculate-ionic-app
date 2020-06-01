import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  routeHome: string = '/home';
  routeInfo: string = '/info';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === this.routeHome) {
        navigator['app'].exitApp();
      } else if (this.router.url === this.routeInfo) {
        this.router.navigate([this.routeHome]);
      }
    });
  }
}
