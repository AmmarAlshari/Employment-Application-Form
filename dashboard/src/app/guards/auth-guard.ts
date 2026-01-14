import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

function decodeToken(token: string): any | null {
  try {
    const payload = token.split('.')[1];
    return console.log(JSON.parse(atob(payload))), JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export const authGuard: CanActivateChildFn = (route) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  //  No token → go to login
  if (!token) {
    router.navigate(['/auth/signin']);
    return false;
  }

  //  Decode token
  const decoded = decodeToken(token);
  if (!decoded) {
    localStorage.removeItem('token');
    router.navigate(['/auth/signin']);
    return false;
  }

  //  (Optional but recommended) check expiration
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < now) {
    localStorage.removeItem('token');
    router.navigate(['/auth/signin']);
    return false;
  }

  // Role check (if route defines roles)
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (allowedRoles && !allowedRoles.includes(decoded.role)) {
    console.log(decoded.role);
    router.navigate(['/unauthorized']);
    return false;
  }

  // if (router.url === '/auth/signin') {
  //   localStorage.removeItem('token');
  //   return true
  // }

  //  All good
  return true;
};
