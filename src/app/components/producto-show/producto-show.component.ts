import { Component, OnInit } from '@angular/core';
import { Producto } from './../../models/producto';
import { global } from './../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ProductoService } from './../../services/producto.service';


@Component({
  selector: 'app-producto-show',
  templateUrl: './producto-show.component.html',
  styleUrls: ['./producto-show.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoShowComponent implements OnInit {

  public url;
  public page_title;
  public producto ;

  public picture;
  public picture0;
  public picture1;
  public picture2;
  public picList;

  public firstPicture;

  public picActive;
  public mainContainer;
  public archivoABuscar;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "VER PRODUCTO";
    this.url = global.url;
    this.producto = new Producto(1,'',true,'');

  }


  ngOnInit(): void {
    this.getProducto();
    this.obtenerValorPicture();
    
 }



  obtenerValorPicture(){
    this.picture = document.querySelector("#pic");
    this.picture0 = document.querySelector("#pic0");
    this.picture1 = document.querySelector("#pic1");
    this.picture2 = document.querySelector("#pic2");
    this.mainContainer = document.querySelector("#picture");
    this.picList = [this.picture0, this.picture1, this.picture2];
    this.picActive = 1;
    //  this.picture0.classList.add('img-active');
    this.mainContainer.addEventListener('mousemove', event => {
      // this.x = event.offsetX;
      // this.y = event.offsetY;
      // this.addOpacity();
    });


    this.mainContainer.addEventListener('mouseout', event => {
      //this.removeOpacity();
    });

    
  }



  changeImage(archivo, imgSrc, n){
    this.archivoABuscar = archivo;
    console.log(this.archivoABuscar);
    this.picture.src = imgSrc;
    //this.zoom.style.backgroundImage = "url("+imgSrc+")";
    //this.picList[this.picActive-1].classList.remove('img-active');
    //this.picList[n-1].classList.add('img-active');
    this.picActive = n;
  }
 



  // zoomIn(event) {
  //   var element = document.getElementById("zoom");
  //   element.style.display = "inline-block";
  //   element.setAttribute("style", "background-image: url(" + this.url +'/productos/GetImage/'+ this.archivoABuscar + ");background-repeat: no-repeat;background-size: 688px 488px");
    
  //   var img = document.getElementById("pic");
  //   var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
  //   var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
  //   element.style.backgroundPosition = (-posX * 1) + "px " + (-posY * 1) + "px";
  
  // }
  
  // zoomOut() {
  //   var element = document.getElementById("zoom");
  //   element.style.display = "none";
  // }

   zoomIn(event) {
    var element = document.getElementById("zoom");
    element.style.display = "inline-block";
    element.setAttribute("style", "background-image: url(" + this.url +'/productos/GetImage/'+ this.archivoABuscar + ");background-repeat: no-repeat;background-size: 688px 488px");
    
    var img = document.getElementById("pic");
    var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
    
    var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
    element.style.backgroundPosition = (-posX * 1) + "px " + (-posY * 1) + "px";
  
  }
  
   zoomOut() {
    var element = document.getElementById("zoom");
    element.style.display = "none";
  }


  getProducto(){
    this._route.params.subscribe(params => {
      let id = params['id'];
  
        this._productoService.getProducto(id).subscribe(
          response =>{
            this.producto = response;
            this.firstPicture = response.archivos[0].archivo
            this.archivoABuscar = this.firstPicture;

          },
          error =>{
            this._router.navigate(['/home']);
          }
        );
    });
  }


 
}
