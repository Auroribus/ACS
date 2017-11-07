import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  userpassword: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  GoToRegister() {
    this.router.navigate(["register"]);
  }

  sendLogin() {
    if (this.username == null || this.username == "")
    {
      console.log("username was empty");
    }
    else if (this.userpassword == null || this.userpassword == "")
    {
      console.log("password was empty");
    }
    else {
      //POST username and password to database
      //if correct combination, login => dashboard
      //else throw error
      console.log(this.username + " " + this.userpassword);
    }
  }


}
