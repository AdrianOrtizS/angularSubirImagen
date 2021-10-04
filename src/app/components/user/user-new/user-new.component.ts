import { Component, OnInit, Output, EventEmitter, NgModule ,ElementRef, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { global }  from 'src/app/services/global';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UserNewComponent implements OnInit {

  resetvar;
  page_title;
  usuario;
  archivos = [];
  roles =[];
  url;
  previsualizacion;
  arrarPrevisualizacion=[];
  archs ;

  //@ViewChild('btnLimpiar', { static: false }) btnGuardar: ElementRef;
  @ViewChild('rol') rol;
  @ViewChild('limpiar') limpiar;
  @ViewChild('cancelar') cancelar;
  @ViewChild('guardar') guardar;
  

  constructor(
    private _sanitizer: DomSanitizer,
    private _usuarioService : UsuarioService,
    private _router : Router
  ) { 
    this.page_title = "Nuevo usuario";
    this.usuario = new Usuario(1,'','','','',true,'');
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getRol();
  }



  onSubmit(usuarioNew){
    this.usuario.password = "1234567890";
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo);
      });

      this._usuarioService.uploadFil(formularioDeDatos).subscribe(
        response => {
          this.archs = response;
          this.usuario.foto = this.archs[0].nombre;
          this._usuarioService.save(this.usuario).subscribe(
            response =>{
              console.log(this.usuario);
              this._router.navigate(['/usuario-list']);
              usuarioNew.reset();
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

  
  
  ngAfterViewInit() { 
    // block  none 
    // if(this.usuario.idrol == 0 || this.usuario.nombre == "" ||this.usuario.email== ""){
    //   this.guardar.nativeElement.disabled = true;
    //   this.limpiar.nativeElement.style.display='none';
    // }


    if(this.usuario.idrol == 0){
      this.guardar.nativeElement.disabled = true;
    }
    
   
  }


  
  getRol(){
    this._usuarioService.getRolsDropdown().subscribe(
      response =>{
        //console.log(response);
        this.roles = response;
      },error =>{

      }
    );
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



  // imageUpload(data){
  //   let image_data = JSON.parse(data.response);
  //   this.usuario.foto = image_data;
  // }

  // public afuConfig = {
  //   multiple: true,
  //   formatsAllowed: ".jpg, .png, .jpeg",
  //   maxSize: "80",
  //   uploadAPI:  {
  //     url: global.url+'/usuarios/Upload',
  //     headers: { // "Authorization" : ""      
  //     }
  //   },
  //   theme: "attachPin",
  //   hideProgressBar: true,
  //   hideResetBtn: true,
  //   hideSelectBtn: false,
  //   attachPinText: 'Selecciona imagen',
  //   replaceTexts: {
  //     selectFileBtn: 'Seleccione imagen',
  //     resetBtn: 'Reset',
  //     uploadBtn: 'Subir',
  //     dragNDropBox: 'Drag N Drop',
  //     attachPinBtn: 'Attach Files...',
  //     afterUploadMsg_success: 'Imagen registrada  !',
  //     afterUploadMsg_error: 'Fallo al subir imagen !'
  //   }
  // };


}
