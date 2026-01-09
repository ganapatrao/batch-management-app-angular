import { CanActivateFn } from '@angular/router';
import { GlobalConstants } from '../constant/Global.constant';

export const authGuard: CanActivateFn = (route, state) => {

  // const localdata = localStorage.getItem('batchUser')
   const localdata = localStorage.getItem(GlobalConstants.LOCAL_LOGIN_KEY)
  if(localdata!=null){
    return true
  }
  return false

  // debugger
  // return true;
};
