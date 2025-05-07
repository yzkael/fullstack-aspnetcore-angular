import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './services/authServices/authGuard/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { InnerLayoutComponent } from './common/layouts/inner-layout/inner-layout.component';
import { MainLayoutComponent } from './common/layouts/main-layout/main-layout.component';
export const routes: Routes = [
    {
        path:"",
        redirectTo:"login",
        pathMatch: "full"
    },
    {
        path:"",
        component:MainLayoutComponent,
        children:[
            {
                path:"login",
                component:LoginComponent,
            },
            {
                path:"register",
                component:RegisterComponent,

            },
        ]
    },
    
    {
        path:"",
        component: InnerLayoutComponent,
        canActivate: [authGuard],
        data:{roles: ["sudo","user"]},
        children:[
            {
                path:"dashboard",
                component:DashboardComponent,
            },
            {
                path:"",
                loadChildren: ()=>import("./pages/routing.module").then( m=> m.RoutingModule)
            },
           
          

        ]
    }
];
