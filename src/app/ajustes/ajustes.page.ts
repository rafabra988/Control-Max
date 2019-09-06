import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PopoverController, NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  
  salario:string;
  salarioatual:number;
  moeda:string;

  constructor(private storage:Storage, private home:HomePage, private nav:NavController) { }
  
  formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  
  ngOnInit() {
    setInterval(() => {
      this.pegarSalario()
    }, 100);
  }

  ionViewWillEnter() {
    
  }

  fechar() {
    this.nav.pop()
  }

  pegarSalario(){
    this.storage.get('salario').then((val) => {
      this.salarioatual = val;
      this.moeda = this.formatter.format(this.salarioatual);
    });
  }

  setSalario(){
    this.salario = (<HTMLInputElement>document.getElementById("salario")).value;
    let moeda = parseFloat(this.salario);
    console.log(moeda);
    this.storage.set('salario', moeda);
  }
}
