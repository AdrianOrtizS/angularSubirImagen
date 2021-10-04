import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { global }  from 'src/app/services/global';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto-new-upload',
  templateUrl: './producto-new-upload.component.html',
  styleUrls: ['./producto-new-upload.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoNewUploadComponent implements OnInit {

  page_title;
  producto;
  archivos = [];
  url;
  previsualizacion;
  arrarPrevisualizacion=[];
  idArchs ;

  constructor(
    private _sanitizer: DomSanitizer,
    private _productoService : ProductoService,
    private _router : Router
  ) { 
    this.page_title = "Nuevo producto upload";
    this.producto = new Producto(1,'',true,[]);
    this.url = global.url;
  }

  ngOnInit(): void {
  }

  capturarFile(event){
    let numArchRec = event.target.files.length;
    for(let i =0; i<numArchRec; i++){
      const archivoCapturado = event.target.files[i];
      this.extraerBase64(archivoCapturado)
          .then((imagen: any) =>{
            this.previsualizacion = imagen.base;
            this.arrarPrevisualizacion.push(this.previsualizacion)
          });
      this.archivos.push(archivoCapturado);
    }
  }


  extraerBase64 = async ($event: any)=> new Promise((resolve, reject)=>{
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this._sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        reject({
          base: null
        });
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  });


  onSubmit(){
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo);
      });
      this._productoService.uploadFil(formularioDeDatos).subscribe(
        response => {
          this.idArchs = response;
          this.producto.archivos = this.idArchs;
          this._productoService.saveProducto(this.producto).subscribe(
            response =>{
              console.log(response);
              this._router.navigate(['/producto-list']);

            },
            error =>{
              console.error(error);
            }
          );
      
        },error =>{
          console.log(error);
        }
      );
    } catch (ex) {
      console.log(ex);
    }
  }


  reset(){
    console.log("reset");
  }
}
