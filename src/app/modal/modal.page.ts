import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService, registro } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

  registros: registro[] = [];
  parar:any;
  total:number;

  @ViewChild('mylist', {static: false})mylist: IonList;
  
  constructor(private modalController: ModalController,private storageService: StorageService, private toastController: ToastController, private plt: Platform, private storage:Storage) {
    this.plt.ready().then(()=>{
      this.listarRegistros();
    })
  }

  ionViewWillEnter(){
    this.listarRegistros();
  }
  
  fechar() {
    clearInterval(this.parar)
    this.modalController.dismiss();
  }
  batata(){

  }
  listarRegistros(){
    this.storageService.listaRegistros().then(registros =>{
      this.registros = registros;
      this.total = 0;
      registros.forEach(element => {
        this.total += element.valor;
      });
      this.storage.set("total", this.total)
      if(registros.length !== 0){
        document.getElementById("test").style.display = "none";
      }else{
        document.getElementById("test").style.display = "block";
      }
      //for(this.i = 0; this.i < this.registros.length; this.i++){
        //let abcd =+ registros.values 
      //} 
    });
  }

  deletarRegistro(registro:registro){
    this.storageService.deletarRegistro(registro.id).then(registro=>{
      this.showToast('Compra Deletada!');
      this.mylist.closeSlidingItems();
      this.listarRegistros();
    })
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
