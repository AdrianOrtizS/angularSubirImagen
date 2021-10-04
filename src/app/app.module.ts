import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule ,}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

import { ProductoShowComponent } from './components/producto-show/producto-show.component';
import { ProductoNewComponent } from './components/producto-new/producto-new.component';
import { ProductoUpdatComponent } from './components/producto-updat/producto-updat.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { HomeComponent } from './components/other/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorComponent } from './components/other/error/error.component';
import { ProductoRandomComponent } from './components/producto-random/producto-random.component';
import { ProductoNewUploadComponent } from './components/producto-new-upload/producto-new-upload.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserShowComponent } from './components/user/user-show/user-show.component';
import { ProductoNewUpload2Component } from './components/producto-new-upload2/producto-new-upload2.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductoShowComponent,
    ProductoNewComponent,
    ProductoUpdatComponent,
    ProductoListComponent,
    HomeComponent,
    ErrorComponent,
    ProductoRandomComponent,
    ProductoNewUploadComponent,
    UserNewComponent,
    UserListComponent,
    UserUpdateComponent,
    UserShowComponent,
    ProductoNewUpload2Component,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    NgxPaginationModule,
    ReactiveFormsModule

  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
