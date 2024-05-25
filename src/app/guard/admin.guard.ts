import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access-token')
  const authService = inject(AuthService)
  if(!authService.isTokenExpired(token)){
    localStorage.removeItem('access-token')
    return false
  }
  
  return authService.getUserData(token).pipe(
    map(res => res.role === 'ADMIN')
  );
};

export const userGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access-token')
  const authService = inject(AuthService)
  const router = inject(Router)

  if(!authService.isTokenExpired(token)){
    localStorage.removeItem('access-token')
    router.navigate(['auth/login'])
    return false
  }
  return true  
};
