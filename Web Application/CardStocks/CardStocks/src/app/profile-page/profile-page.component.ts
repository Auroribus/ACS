import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  email: string;
  userName: string;

  changing: boolean = false;
  change_email: boolean = false;
  change_password: boolean = false;
  change_image: boolean = false;

  oldEmail: string;
  newEmail: string;

  oldPassword: string;
  confirmPassword: string;
  newPassword: string;

  constructor(private dataservice : DataService) { }

  ngOnInit() {
    var id = localStorage.getItem('id');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      console.log(data);
      this.userName = data.username;
      this.email = data.email;
    });
  }

  changeEmail() {
    this.change_password = false;
    this.change_image = false;

    if (this.change_email)
      this.change_email = false;
    else if (!this.change_email)
      this.change_email = true;
  }

  changePassword() {
    this.change_email = false;
    this.change_image = false;

    if (this.change_password)
      this.change_password = false;
    else if (!this.change_password)
      this.change_password = true;
  }

  changeProfileImage() {
    this.change_email = false;
    this.change_password = false;

    if (this.change_image)
      this.change_image = false;
    else if (!this.change_image)
      this.change_image = true;
  }

}
