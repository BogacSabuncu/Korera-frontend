import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import{MdePopoverModule} from '@material-extended/mde';

import{NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent}  from './components/register/register.component';
import {appRoutingModule} from './app.routing';
import {SideNavComponent} from './components/side-nav/side-nav.component';

//fake back end
import {fakeBackendProvider} from './helpers/fake-backend'
import { JwtInterceptor } from './helpers/jwt.interceptor'
import { ErrorInterceptor} from './helpers/error.interceptor'

const material =[
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatCardModule,
  MdePopoverModule
]

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SideNavComponent
  ],
  imports: [
    material,
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    appRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
   // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
