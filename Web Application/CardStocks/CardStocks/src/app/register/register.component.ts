import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  confirm: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  SendRegister() {
    if (this.username == null || this.username == "")
    {
      console.log("name field empty");
    }
    else if (this.email == null || this.email == "")
    {
      console.log("email field empty");
    }
    else if (!this.email.includes("@"))
    {
      console.log("invalid email");
    }
    else if (this.password == null || this.password == "")
    {
      console.log("password field empty");
    }
    else if (this.confirm == null || this.confirm == "")
    {
      console.log("password confirm field empty");
    }
  
}

  GoToLogin() {
    this.router.navigate(["login"]);
  }

}
