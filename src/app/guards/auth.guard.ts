import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const autStatus=inject(ApiService)
  const toaster=inject(ToastrService)
  const router=inject(Router)
  if(autStatus.isLoggedIn()){
    return true;
  }else{
    toaster.warning("Operation failed!!! please login...")
    router.navigateByUrl('/')
    return false
  }
};
