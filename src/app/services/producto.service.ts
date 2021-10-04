
import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

import { productoI } from 'src/app/models/productoI';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;
  public headers;
  

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getProductos(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/productos/Listar',  {headers: this.headers, observe: 'response', params});
  }


  searchProducto(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/productos/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }
  

  saveProducto(pro: productoI):Observable<any>{
    return this._http.post(this.url + '/productos/Crear',pro, {headers: this.headers});
  }


  getProducto(productoId):Observable<any>{
    return this._http.get(this.url+'/productos/Mostrar/'+productoId,{headers: this.headers});
  }


  updateProducto(producto):Observable<any>{
    return this._http.put(this.url + '/productos/Actualizar',producto, {headers: this.headers});
  }


  listaParaRandom():Observable<any>{
    return this._http.get(this.url+'/productos/ListaParaRandom',{headers: this.headers});
  }

  seleccionar(img):Observable<any>{
    return this._http.post(this.url + '/productos/Seleccionar',img, {headers: this.headers});
  }



  uploadFil(form):Observable<any>{
    //return this._http.post(this.url + '/productos/Upload2',form, {reportProgress: true});
  
    const options = {
      //headers: new HttpHeaders().set('Content-Type', this.loopBackAuth.accessTokenId),
      reportProgress: true
    }
  
    return this._http.post(this.url + '/productos/Upload2',form, options);

  }








    
}
