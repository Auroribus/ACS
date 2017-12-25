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
  rating: string;
  amountOfSales: number;
  profile_image : string = "assets/ProfilePicture/Picture_StevenDijcks.jpg"

  changing: boolean = false;
  change_email: boolean = false;
  change_password: boolean = false;
  change_image: boolean = false;
  error: boolean = false;

  errorMessage: string;

  oldEmail: string;
  newEmail: string;

  oldPassword: string;
  confirmPassword: string;
  newPassword: string;

  base64ImageString: string = "assets/LoadingGif4.gif";

  constructor(private dataservice : DataService) { }

  ngOnInit() {
    var id = localStorage.getItem('id');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      console.log(data);
      this.userName = data.username;
      this.email = data.email;
      this.rating = data.rating;
      this.amountOfSales = data.amountOfSales;

      if (data.base64ProfileImage == null || data.base64ProfileImage == "")
      {
        this.base64ImageString = "assets/ProfilePicture/blank_profile_picture.png";
      }
      else
      {
        this.base64ImageString = data.base64ProfileImage;
      }
    });
  }
  
  putUserData() {

    var id = localStorage.getItem('id');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {

      console.log(data);

      let body;

      if (this.change_email)
      {
        console.log("change email");
        body = {
          userId: data.userId,
          username: data.username,
          email: this.newEmail,
          password: data.password,
          amountOfSales: data.amountOfSales,
          rating: data.rating,
          dateOfCreation: data.dateOfCreation,
          storeCredit: data.storeCredit,
          base64ProfileImage: data.base64ProfileImage,
          accConnectionString: data.accConnectionString
        }
      }
      else if (this.change_password)
      {
        console.log("change pass");
        body = {
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: this.newPassword,
          amountOfSales: data.amountOfSales,
          rating: data.rating,
          dateOfCreation: data.dateOfCreation,
          storeCredit: data.storeCredit,
          base64ProfileImage: data.base64ProfileImage
        }

      }
      else if (this.change_image)
      {
        console.log("change image");
        body = {
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: data.password,
          amountOfSales: data.amountOfSales,
          rating: data.rating,
          dateOfCreation: data.dateOfCreation,
          storeCredit: data.storeCredit,
          base64ProfileImage: "data:image/png;base64," + this.base64ImageString
        }
      }

      this.dataservice.PutLocalApi('User/' + id, body).subscribe(data => location.reload());
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

  confirmChangeEmail() {
    this.error = false;

    var id = localStorage.getItem('id');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      console.log(data);
      if (this.oldEmail == data.email)
      {

        console.log("same email found");

        if (this.newEmail == null || this.newEmail == "")
        {
          this.error = true;
          this.errorMessage = "New Email Field Input was empty";
        }
        else {
          if (this.dataservice.ValidateEmail(this.newEmail)) {
            this.error = false;

            this.putUserData();

           }

          else {
            this.error = true;
            this.errorMessage = "New Email Field Input was Invalid";
          }
        }
        
      }
      else
      {
        console.log("wrong email field input");
        this.error = true;
        this.errorMessage = "Wrong Input for Old Email Field";
      }
    });
  }

  changePassword() {
    this.change_email = false;
    this.change_image = false;

    if (this.change_password)
      this.change_password = false;
    else if (!this.change_password)
      this.change_password = true;
  }

  confirmChangePassword() {
    this.putUserData();
  }

  changeProfileImage() {
    this.change_email = false;
    this.change_password = false;

    if (this.change_image)
      this.change_image = false;
    else if (!this.change_image)
      this.change_image = true;
  }

  confirmChangeProfileImage() {
    this.putUserData();
  }

  imageSrc: string = "assets/LoadingGif4.gif";

  handleFileSelect(evt) {

    console.log(evt);

    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      var r2 = new FileReader();

      r2.onload = (e: any) => {
        this.imageSrc = e.target.result;
      }

      r2.readAsDataURL(evt.target.files[0]);

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);

    }

  }

  _handleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.base64ImageString = btoa(binaryString);
    console.log(this.base64ImageString);

  }
}
