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
export class ModalPage implements OnInit {

  registros: registro[] = [];
  i:number;
  Clock = Date.now();
  inputValue :string;

  @ViewChild('mylist', {static: false})mylist: IonList;
  
  constructor(private modalController: ModalController,private storageService: StorageService, private toastController: ToastController, private plt: Platform, private storage:Storage) {
    this.plt.ready().then(()=>{
      this.listarRegistros();
    })
  }

  ngOnInit(){
    setInterval(() => {
      this.Clock = Date.now();
    }, 1000);
  }
  
  parar = setInterval(() => {
      this.listarRegistros();
      this.trocademestest();
  }, 500);
  
  fechar() {
    clearInterval(this.parar)
    this.modalController.dismiss();
  }

  listarRegistros(){
    this.storageService.listaRegistros().then(registros =>{
      this.registros = registros;
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


  trocademestest(){
      this.inputValue = (<HTMLInputElement>document.getElementById("mes")).value;
      if(this.inputValue == "01"){
        this.storage.set("meus-registros", [])
      }
      let test = Date.now()
  }

}
