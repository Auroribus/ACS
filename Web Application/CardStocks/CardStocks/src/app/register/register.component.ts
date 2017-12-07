import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { DataService } from '../data.service';

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

  constructor(private router: Router, private http: Http, private dataservice: DataService) { }

  ngOnInit() {
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
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
      if (this.dataservice.ValidataPassword(this.password))
      {
        if (this.dataservice.ValidateEmail(this.email))
        {
          this.dataservice.GetLocalApi('User')
            .subscribe(data => {
              this.CheckUser(data);
            });
        }
        else {
          console.log("wrong email input");
        }
        
      }
      else
      {
        console.log("wrong password input");
      }
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
      password: this.passHashed,
      amountOfSales: 0,
      dateOfCreation: "29/11/2017",
      rating: 4.2
    }

    this.dataservice.PostLocalApi('User', body).subscribe(data => {
      console.log(data.userId);
      localStorage.setItem('user', this.username);
      localStorage.setItem('id', data.userId);
      this.router.navigate(["dashboard"]);
      location.reload();
    });
  }

  GoToLogin() {
    this.router.navigate(["login"]);
  }

}
