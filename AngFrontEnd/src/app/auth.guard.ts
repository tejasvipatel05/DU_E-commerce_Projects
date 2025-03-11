import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const token = null;
  // console.log(token);
  if(localStorage.getItem('token')){
    console.log("True")
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};
