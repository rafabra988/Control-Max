import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { IntroPage } from './intro/intro.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private rootPage:Router,
    private btn:IntroPage
  ) {
    this.initializeApp();


  this.platform.ready().then(()=>{
    this.storage.get('introShown').then((result) => {
        if(result){
          this.rootPage.navigateByUrl('home');
        }else {
          this.rootPage.navigateByUrl('intro')
          this.storage.set('introShown', true);
        }
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
