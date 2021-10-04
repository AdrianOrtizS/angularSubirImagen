
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { global }  from 'src/app/services/global';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-producto-new-upload2',
  templateUrl: './producto-new-upload2.component.html',
  styleUrls: ['./producto-new-upload2.component.css'],
  providers:[
    ProductoService
  ]
})
export class ProductoNewUpload2Component implements OnInit {

  form: FormGroup;
  page_title;  
  archivos = [];
  url;
  previsualizacion;
  arrarPrevisualizacion=[];
  archs ;


  constructor(
    private _formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _productoService : ProductoService,
    private _router : Router
  ) { 
    this.page_title = "Nuevo producto upload 2";   
    this.url = global.url;
  }
  


  ngOnInit(): void {
    console.log();
    this.form = this._formBuilder.group({
      nombre: ['' ,{ validators:[Validators.required]}],
      archivos: ['',{ validators:[Validators.required]}]
    });
  }


  errorNombre(){
    var nombre = this.form.get('nombre');
    if(nombre.hasError('required')  &&  nombre.touched){
      return 'Campo nombre obligatorio';
    }
    return;
  }


  guardarCambios(){
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo);
      });
      this._productoService.uploadFil(formularioDeDatos).subscribe(
        response => {
          this.archs = response;
          this.form.controls['archivos'].setValue(this.archs);
          //console.log(this.form.controls['archivos']);
          this._productoService.saveProducto(this.form.value).subscribe(
            response =>{
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


  capturarFile(event){
    let numArchRec = event.target.files.length;
    for(let i =0; i<numArchRec; i++){
      const archivoCapturado = event.target.files[i];
      this.extraerBase64(archivoCapturado)
          .then((imagen: any) =>{
            //imagen.base => data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFB
            this.previsualizacion = imagen.base;
            this.arrarPrevisualizacion.push(this.previsualizacion)
          });
      this.archivos.push(archivoCapturado);
    }
    //para validar form img obligatoria 
    this.form.controls['archivos'].setValue( this.archivos ); 
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


}
