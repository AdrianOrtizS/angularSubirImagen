
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/other/error/error.component';
import { HomeComponent } from './components/other/home/home.component';

import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoNewComponent } from './components/producto-new/producto-new.component';
import { ProductoShowComponent } from './components/producto-show/producto-show.component';
import { ProductoUpdatComponent } from './components/producto-updat/producto-updat.component';
import { ProductoRandomComponent } from './components/producto-random/producto-random.component';

import { ProductoNewUploadComponent } from './components/producto-new-upload/producto-new-upload.component';

import { ProductoNewUpload2Component } from './components/producto-new-upload2/producto-new-upload2.component';



import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserShowComponent } from './components/user/user-show/user-show.component';


//DEFINIR RUTAS
const appRoutes: Routes = [

    { path: '',                 component: HomeComponent },
    { path: 'home',             component: HomeComponent},

    { path: 'producto-list',    component: ProductoListComponent },
    { path: 'producto-new',     component: ProductoNewComponent  },
    { path: 'producto-new-upload',     component: ProductoNewUploadComponent  },
    { path: 'producto-new-upload2',     component: ProductoNewUpload2Component  },
    
    { path: 'producto-show/:id',       component: ProductoShowComponent  },
    { path: 'producto-update/:id',     component: ProductoUpdatComponent  },
    { path: 'producto-random',         component: ProductoRandomComponent  },

    { path: 'usuario-list',    component: UserListComponent },
    { path: 'usuario-new',     component: UserNewComponent  },
    //{ path: 'usuario-new-upload',     component: UserNewUploadComponent  },
    { path: 'usuario-show/:id',       component: UserShowComponent  },
    { path: 'usuario-update/:id',     component: UserUpdateComponent  },


    { path: '**',             component: ErrorComponent},
  
  ];
  
  //EXPORTAR CONFIGURACION
  export const appRoutingProviders:any[] = [] ;
  export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
  
  