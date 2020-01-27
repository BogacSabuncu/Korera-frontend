import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import {ProjectComponent} from './components/project/project.component';
import { ResourceComponent } from "./components/resource/resource.component";


const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch:'full',canActivate:[AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: "project", component: ProjectComponent, canActivate:[AuthGuard]},
    { path: "resource", component:ResourceComponent, canActivate:[AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '', pathMatch:'full' }
];

export const appRoutingModule = RouterModule.forRoot(routes);