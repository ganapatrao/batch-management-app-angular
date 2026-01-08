import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  loggedUserdataa: any;

  constructor(private router:Router) {
    const batchUser = localStorage.getItem('batchUser');
    if (batchUser != null) {
      this.loggedUserdataa = JSON.parse(batchUser);
    }
  }



  logout() {
    localStorage.removeItem('batchUser');
        this.router.navigate(['/login']);

}
}
