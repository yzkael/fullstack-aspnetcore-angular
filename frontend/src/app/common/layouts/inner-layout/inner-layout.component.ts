import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authServices/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inner-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './inner-layout.component.html',
  styleUrl: './inner-layout.component.css'
})
export class InnerLayoutComponent {

  authServices = inject(AuthService)
  router = inject(Router);
  storedRoles = localStorage.getItem(environment.rolesLocalStorage);
  roles:string[] = this.storedRoles ?  JSON.parse(this.storedRoles) : []


  hasRole(role:string){
    return this.roles.includes(role);
  }

  onLogoutPress(){
    this.authServices.logoutRequest()
    this.router.navigateByUrl("/")
  } 

}
