import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = HomePage;
  public lists: string[] = ["my-shopping", "my other shopping"];

  constructor(platform: Platform, 
      public menu: MenuController,
      statusBar: StatusBar, 
      splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public openList(name:string) {
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(HomePage, {list:name});
  }

  public newList() {
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(HomePage, {newList:true});
  }

  public openAbout() {
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(AboutPage);
  }

  public openContact() {
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(ContactPage);
  }
}
