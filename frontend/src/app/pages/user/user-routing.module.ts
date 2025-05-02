import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../../services/authServices/authGuard/auth.guard';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    canActivate: [authGuard],
    data:{roles: ["user","sudo"]},
    children:[
      {
        path:'create',
        component: CreateComponent,
        canActivate: [authGuard],
        data:{roles: ["user","sudo"]}
      },
      {
        path:':id',
        component:DetailsComponent,
        canActivate: [authGuard],
        data:{roles: ["user","sudo"]}
      }
    
    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
