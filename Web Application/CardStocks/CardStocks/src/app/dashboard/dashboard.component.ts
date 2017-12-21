import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;

  messages: string[] = [];
  new_messages: boolean = false;

  constructor(private dataservice: DataService, private router: Router, private http: Http) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
    var id = localStorage.getItem('id');
    if (id == null)
    {
      this.router.navigate([""]);
    }
    else
    {
      this.messages = [];

      this.dataservice.GetLocalApi('Message').subscribe(data => {
        console.log(data);
        for (var i = 0; i < data.length; i++)
        {
          if (data[i].userOneId == id)
          {
            this.messages.push(data[i]);
            this.new_messages = true;
          }
        }
      });
    }
  }

  delete_message(id) {
    this.http.delete("/api/Message/" + id)
      .subscribe(data => {
        location.reload();
      });
  }

  logOut() {
    //localStorage.setItem('user', "Login");
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

}
