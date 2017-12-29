import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
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

  feedback_register: string = "";

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
      this.feedback_register = "* Username Field is required";
    }
    else if (this.email == null || this.email == "")
    {
      this.feedback_register = "* Email Field is required";
    }
    else if (this.password == null || this.password == "")
    {
      this.feedback_register = "* Password Field is required";
    }
    else if (this.confirm == null || this.confirm == "")
    {
      this.feedback_register = "* Confirm Password Field is required";
    }
    else if (this.password != this.confirm)
    {
      this.feedback_register = "* Passwords do not match";
    }
    else
    {
      if (this.dataservice.ValidataPassword(this.password))
      {
        console.log(this.dataservice.ValidataPassword(this.password));
        if (this.dataservice.ValidateEmail(this.email))
        {
          this.http.get('/api/User')
            .map(res => res.json())
            .subscribe(data => {
              this.CheckUser(data);
            });
        }
        else {
          this.feedback_register = "* Email Field input was wrong";
        }
        
      }
      else
      {
        this.feedback_register = "* Password must be 8 characters, including 1 uppercase letter, 1 special character and 1 alphanumeric character";
      }
    }
  
  }

  CheckUser(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].username == this.username) {
        console.log("username already exists")
        this.feedback_register = "* Username is already being used";
        this.userFound = true;
        break;
      }
      else if (data[i].email == this.email)
      {
        this.feedback_register = "* This Email is already being used";
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

    var date = new Date();
    var fullDate;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    fullDate = day + "/" + month + "/" + year;

    body = {
      username: this.username,
      email: this.email,
      password: this.passHashed,
      amountOfSales: 0,
      dateOfCreation: fullDate,
      rating: 2.5,
      storeCredit: 10
    }

    this.dataservice.PostLocalApi('User', body).subscribe(data => {
     
      localStorage.setItem('user', this.username);      
      localStorage.setItem('id', data.userId);

      let bodyMember = {
        userId: data.userId,
        memberStatus: "Common"
      }

      this.dataservice.PostLocalApi('Membership', bodyMember).subscribe(memberdata => {
        
        this.router.navigate(["dashboard"]);
        location.reload();
      });      
    });
  }

  GoToLogin() {
    this.router.navigate(["login"]);
  }

}
