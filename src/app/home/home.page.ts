import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { animacaoEntrada } from '../testeAnimacao/entrar';
import { anicacaoSaida } from '../testeAnimacao/sair';
import { NovogastoPage } from '../novogasto/novogasto.page';
import { StorageService, registro } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  registros: registro[] = [];

  @ViewChild('mylist', {static: false})mylist: IonList;

  novoRegistro: registro = <registro>{};

  Clock = Date.now();
  
  inputValue :string;
  
  
  constructor(public modalController: ModalController,private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    
  }
      ngOnInit() {
        var hammertime = new Hammer(document.body);
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        
        setInterval(() => {
          this.Clock = Date.now();
          this.test()
        }, 1000);
         
      }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      enterAnimation: animacaoEntrada,
      leaveAnimation: anicacaoSaida
    });
    return await modal.present();
  }

  async novog() {
    const modal = await this.modalController.create({
      component: NovogastoPage
    });
    return await modal.present();
  }


  test(){
    //document.getElementById('mes').onchange
    this.inputValue = (<HTMLInputElement>document.getElementById("mes")).value;
    console.log(this.inputValue)
    if(this.inputValue == "20"){
     
    }
  }

  fechar() {
    this.modalController.dismiss();
  }


}
