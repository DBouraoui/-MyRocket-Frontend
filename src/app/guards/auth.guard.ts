import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/user/auth.service';

export const authGuard: CanActivateFn = () => {
const authService = inject(AuthService);
const router = inject(Router);

  if (authService.isTokenExpired()) {
    router.navigateByUrl('/home');
      return false;
  }

  if (!authService.hasRole('ROLE_CUSTOMER') && !authService.hasRole('ROLE_ADMIN')) {
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
