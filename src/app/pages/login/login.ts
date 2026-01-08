import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj:any= {
    email: "",
    password: ""
  };

  http = inject(HttpClient)
  router = inject(Router);

login(){
  this.http.post('https://feestracking.freeprojectapi.com/api/BatchUser/login',this.loginObj).subscribe(
    {
      next:(res:any) => { localStorage.setItem('batchUser',JSON.stringify(res.data));
        this.router.navigate(['/dashboard']);
      },
      error:(err:any) => {console.log(err);}
      
    }
  )

}

}
