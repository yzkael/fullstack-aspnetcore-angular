import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SudoComponent } from './pages/sudo/sudo.component';
import { authGuard } from './services/authServices/authGuard/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { InnerLayoutComponent } from './layouts/inner-layout/inner-layout.component';

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
        children:[
            {
                path:"dashboard",
                component:DashboardComponent,
                canActivate: [authGuard],
                data:{roles: ["sudo","user"]}
            },
            {
                path:"sudo",
                component:SudoComponent,
                canActivate:[authGuard],
                data:{roles : ["sudo"]}
            },
            {
                path:"user",
                component:UserComponent,
                canActivate:[authGuard],
                data:{roles : ["user"]}
            }

        ]
    }
];
