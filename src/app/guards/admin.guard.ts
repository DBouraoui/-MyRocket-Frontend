import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/user/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) {
    router.navigateByUrl('/login');
    return false;
  }

  if (!authService.hasRole('ROLE_ADMIN')) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
