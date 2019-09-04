import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService, registro } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage  {

  registros: registro[] = [];

  @ViewChild('mylist', {static: false})mylist: IonList;
  
  constructor(private modalController: ModalController,
    private storageService: StorageService, 
    private toastController: ToastController,
    private plt: Platform) {
    this.plt.ready().then(()=>{
      this.listarRegistros();
    })
   }

  fechar() {
    this.modalController.dismiss();
  }

  listarRegistros(){
    this.storageService.listaRegistros().then(registros =>{
      this.registros = registros;
      if(registros.length !== 0){
        /*let texto = "Nenhuma compra foi adicionada ainda";
        let html = document.getElementById("test").innerHTML;

        html=html+"<p>"+texto+"</p>";
        document.getElementById("test").innerHTML = html;
        document.getElementById("test").style.display = "block";*/
        document.getElementById("test").style.display = "none";
      }else{
        document.getElementById("test").style.display = "block";
      }
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

  //private registro = []

   //testii(){
     // this.registro.push({local:"crl", gasto:"oi2"});
      //console.log(this.registro);
   //}
}
