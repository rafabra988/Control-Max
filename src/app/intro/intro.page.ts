import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  salario:string;

  constructor(    
    private storage: Storage,
    private rootPage:Router,) { }

  ngOnInit() {
  }
  

  pegarSalario(){
    this.salario = (<HTMLInputElement>document.getElementById("salario")).value;
    this.storage.set('salario', this.salario)
    this.rootPage.navigateByUrl("/home")
  }

}
