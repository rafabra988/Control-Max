import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, registro } from '../services/storage.service';
import { IonList, ToastController, AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  historico: registro[] = [];
  loop:any;

  @ViewChild('mylist', {static: false})mylist: IonList;

  constructor(private storageService:StorageService, private toastController:ToastController, private storage:Storage, private alertController:AlertController, private router:Router) { }

  ngOnInit() {
    this.loop = setInterval(() => {
      this.msg();
    }, 1);
  }

  ionViewWillEnter(){
    this.listarHistorico();
  }

  msg(){
    if(this.historico.length !== 0){
      document.getElementById("test").style.display = "none";
    }else{
      document.getElementById("test").style.display = "block";
    }
}

  listarHistorico(){
    this.storageService.listaHistorico().then(lhistorico =>{
      this.historico = lhistorico;
    });
  }

  deletarHistorico(historico:registro){
    this.storageService.deletarHistorico(historico.id).then(hist=>{
      this.showToast('Compra Deletada!');
      this.mylist.closeSlidingItems();
      this.listarHistorico();
    })
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  histfechar(){
    clearInterval(this.loop);
    this.router.navigateByUrl('home')
  }

  async apagar() {
    const alert = await this.alertController.create({
      header: 'Você realmente deseja apagar o histórico?',
      message: 'Isso apagará todo o histórico, sem posibilidade de recuperação',
      buttons: [
        {
          text: 'Não',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.storage.set("historico", []);
            this.listarHistorico();
          }
        }
      ]
    });

    await alert.present();
  }


}
