import { Injectable, signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading = signal(false);
  private activeRequest =0

  show() {
    this.activeRequest++;
    this.loading.set(true);
  }

  hide() {
    this.activeRequest--;
    if(this.activeRequest<=0){
      this.activeRequest=0;
         this.loading.set(false);
    }
 
  }
  
}
