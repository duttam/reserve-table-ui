import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  constructor(
              public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
   // if (this.auth.isLoggedIn()) {
      //this.router.navigate(['/reserve']);
    //}
    console.log("login")
  }
  
  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    

      this.auth.login(values)
      .subscribe(data => {
        this.auth.setToken(data.token);
        console.log(data);
        this.router.navigate(['/employee']);
      },
      error => console.log(error.message));
  }

  


}
