import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ActivatedRoute, RoutesRecognized } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideInOutLeftRight', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutUpDown', [
      state('in', style({
        transform: 'translate3d(0, 100px, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],

})
export class NavbarComponent implements OnInit {

  searchCardName: string;
  activeRoute: string;
  login: string;
  loggedIn: boolean;

  constructor(private dataservice: DataService, private http: Http, private router: Router, private route: ActivatedRoute)
  {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized)
      {        
        this.activeRoute = event.url;
        console.log(this.activeRoute);
      }
    });

    
  }

  menuState: string = this.dataservice.slideInOutLeftRight;
  loginState: string = this.dataservice.slideInOutUpDown;

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.dataservice.slideInOutLeftRight = this.dataservice.slideInOutLeftRight === 'out' ? 'in' : 'out';
  }

  toggleLogin() {
    if (this.dataservice.activeUser == null || this.dataservice.activeUser == "" || this.dataservice.activeUser == "Login") {
      //no user logged in show login button
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
    }

    if (!this.loggedIn)
    this.dataservice.slideInOutUpDown = this.dataservice.slideInOutUpDown === 'out' ? 'in' : 'out';
  }

  search() {
    if (this.searchCardName != null) {
      /*
      Seperate search for each page with a single search bar

      if (this.activeRoute == "/sell")
      {
        this.router.navigate(["sell"], { fragment: this.searchCardName });
      }
      else if (this.activeRoute == "/buy")
      {
        this.router.navigate(["buy"], { fragment: this.searchCardName });
      }
      else if (this.activeRoute == "/collection")
      {
        this.router.navigate(["collection"], { fragment: this.searchCardName });
      }
      else if (this.activeRoute == "/wishlist")
      {
        this.router.navigate(["wishlist"], { fragment: this.searchCardName });
      }
      else
      {
        
      }*/

      this.router.navigate(["details"], { fragment: this.searchCardName });
    }
    else {
      console.log("input field is empty");
    }
    
  }

  GoToHome() {
    this.router.navigate([""]);
  }

  ngOnInit() {
    if (this.dataservice.activeUser == null || this.dataservice.activeUser == "" || this.dataservice.activeUser == "Login") {
      //no user logged in show login button
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
    }
  }


}
