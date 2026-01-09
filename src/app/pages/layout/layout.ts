import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { GlobalConstants } from '../../core/constant/Global.constant';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  loggedUserdataa: any;

  constructor(private router:Router) {
    const batchUser = localStorage.getItem(GlobalConstants.LOCAL_LOGIN_KEY);
    if (batchUser != null) {
      this.loggedUserdataa = JSON.parse(batchUser);
    }
  }



  logout() {
    localStorage.removeItem('batchUser');
        this.router.navigate(['/login']);

}
}
