import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-producto-new',
  templateUrl: './producto-new.component.html',
  styleUrls: ['./producto-new.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoNewComponent implements OnInit {

  resetvar;
  page_title;
  producto;
  archivos = [];
  url;


  constructor(
    private _productoService : ProductoService,
    private _router : Router
  ) { 
    this.page_title = "Nuevo producto";
    this.producto = new Producto(1,'',true,null);
    this.url = global.url;
  }

  ngOnInit(): void {
  }


  onSubmit(productoNew){

    this._productoService.saveProducto(this.producto).subscribe(
      response =>{
        this._router.navigate(['/producto-list']);
        this.producto.archivos = null;
        productoNew.reset();
        console.log(this.producto);
      },
      error =>{
        console.log(error);
      }
    );
  }



  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.producto.archivos = image_data;
    console.log(this.producto.archivos);
  }


  public afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg, .png, .jpeg",
    maxSize: "80",
    uploadAPI:  {
      url: global.url+'/productos/Upload',
      headers: { // "Authorization" : ""      
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Selecciona imagen',
    replaceTexts: {
      selectFileBtn: 'Seleccione imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Imagen registrada  !',
      afterUploadMsg_error: 'Fallo al subir imagen !'
    }
  };


}
