import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { registro } from '../services/storage.service';
import { StorageService } from '../services/storage.service';
import { ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-novogasto',
  templateUrl: './novogasto.page.html',
  styleUrls: ['./novogasto.page.scss'],
})
export class NovogastoPage implements OnInit {


  novoRegistro: registro = <registro>{};

  constructor(public modalController: ModalController,
    private storageService: StorageService, 
    private toastController: ToastController,
    private storage:Storage) { }

  ngOnInit() {
    //habilitar o hammerjs em todas as direções
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

  }

  //função para fechar modal
  fechar() {
    this.modalController.dismiss();
  }

  addRegistro(){
    this.novoRegistro.id = Date.now();

    this.storageService.addRegistro(this.novoRegistro).then(registro => {
      this.novoRegistro = <registro>{};
      this.showToast('Compra Adicionada!')

    })
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  inputtext:string;
  key:string = 'username';

  saveData(){
    this.storage.set(this.key, this.inputtext);   
  }

  loadData(){
    this.storage.get(this.key).then((val)=>{
      console.log(val);
    })
  }


}
