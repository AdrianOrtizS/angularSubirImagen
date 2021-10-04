import { Component, OnInit } from '@angular/core';
import { Producto } from './../../models/producto';
import { global } from './../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoListComponent implements OnInit {

  public url;
  public page_title;
  public productos : Array<Producto>;
  public productosPdf ; 
  public producto ;
  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "PRODUCTO";
    this.url = global.url;
    this.producto = new Producto(1,'',true,'');
    this.campoBuscar = "nombre";

  }


  ngOnInit(): void {
    //  this._userService.testAuthenticate();
    this.getProducto(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
    
  }
 
  

 


  buscarPor() {
    this.campoBuscar;
  }


  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getProducto(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  
  getProducto( pagina:number, cantidadRegistrosAMostrar:number){
    this.producto.nombre = "";
    this._productoService.getProductos(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.productos = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error);
      }
    );
  }


  searchProducto(valor ){
    this._productoService.searchProducto(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.productos = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error+" Error search");
      }
    );
  }


  pageChange(event ){
    this.paginaActual = event ;
    this.cantidadRegistrosAMostrar = 5;
    this.getProducto(this.paginaActual, this.cantidadRegistrosAMostrar);
  }


  // pdfArticles(){
  // console.log("pdf");
  //   this._articleService.pdfArticles();
  // }

 
}
