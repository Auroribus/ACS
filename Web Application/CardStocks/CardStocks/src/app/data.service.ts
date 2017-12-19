import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class DataService {

  membership: string;
  username: string;
  id: number;
  credits: number;

  constructor(private http:Http) {
    var id = localStorage.getItem('id');
    if (id == null || id == "")
    {
      console.log("not logged in");
    }
    else
    {
    
    this.GetLocalApi('User/' + id).subscribe(data => {

      console.log(data);

      this.username = data.username;
      this.id = data.userId;
      this.membership = data.membership;
      this.credits = data.storeCredit;

      console.log(this.username + " " + this.id + " " + this.membership + " " + this.credits);
    });

    }
  }


  hoverItem: number;
  
  //Animation related
  slideInOutLeftRight = "out";
  slideInOutUpDown = "out";
  showImage = "out";
    
  //Theme related
  currentTheme = "Default";
  logo_Image = "assets/Logo.png";

  SwitchTheme(name: string) {

    var primary;
    var secondary;
    var primTxt;
    var secTxt;

    if (name == 'Dark') {
      primary = 'white';
      secondary = 'black';
      primTxt = 'black';
      secTxt = 'white';
      this.logo_Image = "assets/Logo_dark.png";
    }

    if (name == 'Default') {
      primary = 'black';
      secondary = 'white';
      primTxt = 'white';
      secTxt = 'black';
      this.logo_Image = "assets/Logo.png";
    }

    // Background
    document.documentElement.style.setProperty('--primary-bg-color', primary);
    document.documentElement.style.setProperty('--secondary-bg-color', secondary);

    //Text
    document.documentElement.style.setProperty('--primary-text-color', primTxt);
    document.documentElement.style.setProperty('--secondary-text-color', secTxt);

    document.documentElement.style.setProperty('--primary-color', 'black');

  }


  searchCardName: string;
  searchCardSet: string;

  ValidataPassword(inputtxt) {

    var passw = /[a-z]/;
    if (inputtxt.match(passw)) {
      alert('Correct, try another...')
      return true;
    }
    else {
      alert('Wrong...!')
      return false;
    }  
  }

  ValidateEmail(email)
  {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      alert("You have entered an invalid email address!");
      return false;
    } 
  }

  GetLocalApi(name) {
    return this.http.get('/api/' + name)
      .map(res => res.json());
  }

  GetLocalApiWithParams(name, params) {
    return this.http.get('/api/' + name, {search: params})
      .map(res => res.json());
  }

  GetExternalApi(link) {
    return this.http.get(link)
      .map(res => res.json());
  }

  PutLocalApi(name, body) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/' + name, body, { headers: headers });
  }

  PostLocalApi(name, body) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/' + name, body, { headers: headers })
      .map((response) => response.json());
  }
}
