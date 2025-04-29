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
        children:[
            {
                path:"dashboard",
                component:DashboardComponent,
                canActivate: [authGuard],
                data:{roles: ["sudo","user"]}
            },
            {
                path:"user",
                loadChildren: ()=> import("./pages/user/user.module").then(m=>m.UserModule)
            },
            {
                path:"admin",
                loadChildren: ()=> import("./pages/admin/admin.module").then(m=> m.AdminModule)
            }
          

        ]
    }
];
