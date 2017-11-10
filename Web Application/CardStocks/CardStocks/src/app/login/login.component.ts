import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  userpassword: string;
  passHashed: string | Int32Array;


  constructor(private dataservice: DataService, private router: Router, private http: Http) { }

  ngOnInit() {
  }

  GoToRegister() {
    this.router.navigate(["register"]);
  }

  LogIn() {
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

      this.passHashed = Md5.hashStr(this.userpassword);

      this.dataservice.slideInOutUpDown = "out";

      this.http.get('/api/User')
        .map(res => res.json())
        .subscribe(data => {          
          this.CheckUser(data);
        });
    }
  }

  CheckUser(data) {
    for (var i = 0; i < data.length; i++)
    {
      if (data[i].username == this.username && data[i].password == this.passHashed)
      {
        console.log("user found");
        this.dataservice.activeUser = this.username;
        this.router.navigate(["dashboard"]);
      }
      else
      {
        console.log("no user found");        
      }

    }
  }


}
