import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const expectedRoles = route.data['roles'] as string[]
  const roles = localStorage.getItem('roles')
  const token = localStorage.getItem('access-token')
      if (!roles || !token) {
        router.navigateByUrl('/login')
        return false;
      }else if (expectedRoles.some(role => roles?.includes(role))) {
        return true;
      } else{
        router.navigateByUrl('/dashboard')
        return false;
      }
    }

