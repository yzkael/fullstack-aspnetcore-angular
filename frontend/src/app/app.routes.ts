import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/mainLayout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SudoComponent } from './pages/sudo/sudo.component';
import { authGuard } from './services/authGuard/auth.guard';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"login",
        pathMatch: "full"
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"",
        component: MainLayoutComponent,
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
