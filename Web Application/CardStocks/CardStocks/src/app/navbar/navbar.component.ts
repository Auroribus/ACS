import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ActivatedRoute, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class NavbarComponent implements OnInit {

  searchCardName: string;
  activeRoute: string;

  constructor(private _httpService: Http, private router: Router, private route: ActivatedRoute)
  {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized)
      {        
        this.activeRoute = event.url;
        console.log(this.activeRoute);
      }
    });
  }

  menuState: string = 'out';

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
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

  GoToLogin() {
    this.router.navigate(["login"]);
  }

  GoToHome() {
    this.router.navigate([""]);
  }

  ngOnInit() {
    
  }


}
