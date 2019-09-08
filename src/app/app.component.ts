import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ModalPage } from './modal/modal.page';
import { HomePage } from 'cont_backup/src/app/home/home.page';
import { ModalPageModule } from './modal/modal.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  Clock = Date.now();
  inputValue :string;

  constructor(private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar,private storage: Storage,private rootPage:Router, private alertController:AlertController, private soma:ModalPage, private modal:ModalPage) {
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

  
  ngOnInit(){
    setInterval(() => {
      this.Clock = Date.now();
      this.trocademestest();
      this.modal.listarRegistros();
    }, 1000);
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Novo Mês!',
      message: 'Um novo mês começou! seu gerenciador de compras foi zerado. Você pode consultar sua compras antigas no historico',
      buttons: ['OK']
    });

    await alert.present();
  }

  trocademestest(){
    this.inputValue = (<HTMLInputElement>document.getElementById("mes")).value;
    //console.log(this.inputValue);
    if(this.inputValue == "01"){
      this.presentAlert();
      this.storage.set("meus-registros", []);
    }
}
}
