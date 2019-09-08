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
export class ModalPage implements OnInit{

  registros: registro[] = [];
  parar:any;
  total:number;

  @ViewChild('mylist', {static: false})mylist: IonList;
  
  constructor(private modalController: ModalController,private storageService: StorageService, private toastController: ToastController, private plt: Platform, private storage:Storage) {
    this.plt.ready().then(()=>{
      this.listarRegistros();
    })
  }

  ngOnInit(){
    this.parar = setInterval(() => {
      this.msg();
    }, 1);
  }

  ionViewWillEnter(){
    this.listarRegistros();
  }

  msg(){
    if(this.registros.length !== 0){
      document.getElementById("test").style.display = "none";
    }else{
      document.getElementById("test").style.display = "block";
    }
  }

  fechar() {
    clearInterval(this.parar)
    this.modalController.dismiss();
  }

  listarRegistros(){
    this.storageService.listaRegistros().then(registros =>{
      this.registros = registros;
      this.total = 0;
      this.registros.forEach(element => {
        this.total += element.valor;
      });
      this.storage.set("total", this.total)
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
