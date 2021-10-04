import { Component, OnInit, Output, EventEmitter, NgModule, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-producto-random',
  templateUrl: './producto-random.component.html',
  styleUrls: ['./producto-random.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoRandomComponent implements OnInit {

  resetvar;
  page_title;
  producto;
  archivos = [];
  url;

  listaArchivos =[];
  interval;
  currentTime;
  aleat;
  aleat2;
  aleat3;
  

  constructor(
    private _productoService : ProductoService,
    private _router : Router
  ) { 
    this.page_title = "Nuevo producto";
    this.producto = new Producto(1,'',true,null);
    this.url = global.url;
  }

  ngOnInit(): void {
    this.listaParaRandom();
  }


  //llena array con datos
  listaParaRandom(){
    this._productoService.listaParaRandom().subscribe(
      response =>{
        this.listaArchivos = response;
        console.log(this.listaArchivos);
      },
      error =>{ }
    );
  }


  jugar(){

    document.getElementById('jugar').innerHTML = "";
    document.getElementById('jugar2').innerHTML = "";
    document.getElementById('jugar3').innerHTML = "";
    document.getElementById('mensajeResultado').innerHTML = "";
              
    let i;
    for(i = 1 ; i <= 20 ; i++){

      this.delay(i, this.listaArchivos, this.url); //i = 23
      
    }

  }

  
  delay(ms: number, lista, url) {

    return new Promise((resolve, reject)=>{
        setTimeout(function() {
          this.aleat  = Math.floor(Math.random() * (lista.length - 0)) + 0; 
          this.aleat2 = Math.floor(Math.random() * (lista.length - 0)) + 0; 
          this.aleat3 = Math.floor(Math.random() * (lista.length - 0)) + 0; 
          document.getElementById('jugar').innerHTML = "<img src= "+url +'/productos/GetImage/'+ lista[this.aleat].nombre+"   width=\"200px\" height=\"150px\">";
          document.getElementById('jugar2').innerHTML = "<img src= "+url +'/productos/GetImage/'+ lista[this.aleat2].nombre+"   width=\"200px\" height=\"150px\">";
          document.getElementById('jugar3').innerHTML = "<img src= "+url +'/productos/GetImage/'+ lista[this.aleat3].nombre+"   width=\"200px\" height=\"150px\">";
          if(ms == 20){
            resolve(lista[this.aleat].nombre+'/'+lista[this.aleat2].nombre+'/'+lista[this.aleat3].nombre);
            let menRes="";
            if(lista[this.aleat].nombre == lista[this.aleat2].nombre && lista[this.aleat].nombre == lista[this.aleat3].nombre){
              console.log("Has ganado");              
              menRes = "Has Ganado";
              document.getElementById('mensajeResultado').innerHTML = "<h1>"+menRes+"</h1>";
            }else{
              menRes="Sigue participando";
              document.getElementById('mensajeResultado').innerHTML = "<h1>"+menRes+"</h1>";
            }
          }
          if(ms > 20){
          
            reject('Algo salio mal');
          }
        }, 100*ms);     //}, 100*ms, lista, url);

     }) .then(lista => console.log())
        .catch(err => console.warn(err));        
    
  }



}
