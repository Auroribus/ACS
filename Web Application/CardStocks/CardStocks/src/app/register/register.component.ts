import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

let body;

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
  passHashed: string | Int32Array;

  userFound: boolean;
  emailFound: boolean;

  constructor(private router: Router, private http: Http) { }

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
    else if (this.password != this.confirm)
    {
      console.log("passwords do not match")
    }
    else
    {
      this.http.get('/api/User')
        .map(res => res.json())
        .subscribe(data => {
          this.CheckUser(data);
        });

      
      
      
    }
  
  }

  CheckUser(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].username == this.username) {
        console.log("username already exists")
        this.userFound = true;
        break;
      }
      else if (data[i].email == this.email)
      {
        console.log("an account with this email already exists");
        this.emailFound = true;
        break;
      }
    }

    if (!this.userFound && !this.emailFound)
    {
      this.SendRegisterRequest();
    }
  }

  SendRegisterRequest() {
    this.passHashed = Md5.hashStr(this.password);

    body = {
      username: this.username,
      email: this.email,
      password: this.passHashed
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/User', body, { headers: headers })
      .map((response) => response.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  GoToLogin() {
    this.router.navigate(["login"]);
  }

}
