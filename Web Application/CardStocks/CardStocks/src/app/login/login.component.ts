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

  feedback_string: string;
  feedback_bool: boolean = false;

  constructor(private dataservice: DataService, private router: Router, private http: Http) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  InvertCloseMenu($event: Event) {
    $event.stopPropagation();
  }

  ngOnInit() {
    
  }

  GoToRegister() {
    this.router.navigate(["register"]);
  }

  LogIn() {
    console.log("attampting login");
    if (this.username == null || this.username == "")
    {
      this.feedback_string = "* Username Field was empty";
      this.feedback_bool = true;
    }
    else if (this.userpassword == null || this.userpassword == "")
    {
      this.feedback_string = "* Password Field was empty";
      this.feedback_bool = true;
    }
    else {
      this.passHashed = Md5.hashStr(this.userpassword);

      this.dataservice.GetLocalApi('User').subscribe(data => {
        this.CheckUser(data);
      });
    }
  }

  CheckUser(data) {
    for (var i = 0; i < data.length; i++)
    {
      if (data[i].username == this.username && data[i].password == this.passHashed)
      {
       console.log("userfound");
       localStorage.setItem('user', this.username);
       localStorage.setItem('id', data[i].userId);
       this.router.navigate(['dashboard']);
       location.reload();
       break;
      }
      else
      {
        console.log("no user found");
        this.feedback_string = "* Username or Password was Incorrect";
        this.feedback_bool = true;
      }
    }
  }
}
