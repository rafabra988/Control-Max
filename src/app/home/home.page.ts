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
  
  salarioatual:number;
  moeda:string;
  i:number;
  storageService: any;
  testii:string;
  
  
  constructor(public modalController: ModalController, private storage:Storage) { }

  formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  ngOnInit() {
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    
    setInterval(() => {
      this.pegarSalario();
    }, 1000);
    
    this.total();
    // this.plt.ready().then(()=>{
      //this.pegarSalario();
   //}) 
  }
  
  /*ois(){
    this.storageService.listaRegistros().then(registros =>{
    this.registros = registros;
    console.log(this.registros.length)
    //for(this.i = 0; this.i < this.registros.length; this.i++){
      //console.log("test")
     //} 
    });
  }*/

  total(){
    this.storage.get("total").then((soma) =>{
      this.testii = this.formatter.format(soma);
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

  fechar() {
    this.modalController.dismiss();
  }

  pegarSalario(){
    this.storage.get('salario').then((val) => {
      this.salarioatual = val;
      this.moeda = this.formatter.format(this.salarioatual);
      //console.log(this.moeda)
    });
  }


}
