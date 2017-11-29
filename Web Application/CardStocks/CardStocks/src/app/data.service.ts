import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class DataService {

  constructor(private http:Http) {

  }

  hoverItem: number;

  //User related
  activeUser = "Login";

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

    if (name == 'Dark') {
      primary = 'white';
      secondary = 'black';
      this.logo_Image = "assets/Logo_dark.png";
    }

    if (name == 'Default') {
      primary = 'black';
      secondary = 'white';
      this.logo_Image = "assets/Logo.png";
    }

    // Background
    document.documentElement.style.setProperty('--primary-bg-color', primary);
    document.documentElement.style.setProperty('--secondary-bg-color', secondary);

    //Text
    document.documentElement.style.setProperty('--primary-text-color', secondary);
    document.documentElement.style.setProperty('--secondary-text-color', primary);

    document.documentElement.style.setProperty('--primary-color', primary);

  }


  searchCardName: string;
  searchCardSet: string;

  ValidataPassword(inputtxt) {

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
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

  PostLocalApi(name, body) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/' + name, body, { headers: headers })
      .map((response) => response.json());
  }
}
