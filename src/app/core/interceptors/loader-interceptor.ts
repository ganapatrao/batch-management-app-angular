import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader-service';
import { finalize } from 'rxjs';


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoaderService);

 if (req.headers.has('X-Skip-Loader')) {
    return next(req);
  }



  debugger
   loader.show();

  return next(req).pipe(
    finalize(() => {
      loader.hide();
    })
  );
};