import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { animacaoEntrada } from '../testeAnimacao/entrar';
import { anicacaoSaida } from '../testeAnimacao/sair';
import { NovogastoPage } from '../novogasto/novogasto.page';
import { registro } from '../services/storage.service';
import { IonList } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  salarioatual:number;
  moeda:string;
  
  
  constructor(public modalController: ModalController, private storage:Storage, private plt:Platform) {
    
  }

  formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  ngOnInit() {
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    
    setInterval(() => {
      this.Clock = Date.now();
      this.test()
    }, 1000);
      
    this.plt.ready().then(()=>{
      this.pegarSalario();
    }) 
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
    //console.log(this.inputValue)
    if(this.inputValue == "20"){
     
    }
  }

  fechar() {
    this.modalController.dismiss();
  }

  pegarSalario(){
    this.storage.get('salario').then((val) => {
      this.salarioatual = val;
      this.moeda = this.formatter.format(this.salarioatual);
      console.log(this.moeda)
    });
  }


}
