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

  constructor(private dataservice: DataService, private router : Router) { }

  ngOnInit() {
    this.username = this.dataservice.activeUser;
    if (this.username == null || this.username == "" || this.username == "Login")
    {
      this.router.navigate([""]);
    }
  }

}
