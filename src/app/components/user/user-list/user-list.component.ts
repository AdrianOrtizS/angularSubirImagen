import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../../models/usuario';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UsuarioService } from './../../../services/usuario.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UserListComponent implements OnInit {

  public url;
  public page_title;
  public usuarios : Array<Usuario>;
  public usuariosPdf ; 
  public usuario ;
  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "USUARIO";
    this.url = global.url;
    this.usuario = new Usuario(1,'',0,'','',true,'');
    this.campoBuscar = "nombre";

  }


  ngOnInit(): void {
    this.getUsuario(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
  }
 
  

  buscarPor() {
    this.campoBuscar;
  }


  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getUsuario(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  
  getUsuario( pagina:number, cantidadRegistrosAMostrar:number){
    this.usuario.nombre = "";
    this._usuarioService.getUsuarios(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.usuarios = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error);
      }
    );
  }


  searchProducto(valor ){
    this._usuarioService.searchUsuario(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.usuarios = response.body;
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
    this.getUsuario(this.paginaActual, this.cantidadRegistrosAMostrar);
  }


}
