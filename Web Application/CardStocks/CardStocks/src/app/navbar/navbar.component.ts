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
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, -110%, 0)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],

})
export class NavbarComponent implements OnInit {

  profileImg: string = "/assets/Logo.png";

  searchCardName: string = "";
  searchSetName: string = "";
  activeRoute: string;
  login: string;
  loggedIn: boolean = false;
  logdIn: boolean = false;

  smallScreen: boolean = false;

  constructor(private dataservice: DataService, private http: Http, private router: Router, private route: ActivatedRoute)
  {

  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.dataservice.slideInOutLeftRight = this.dataservice.slideInOutLeftRight === 'out' ? 'in' : 'out';
  }

  toggleLogin() {

    var user = localStorage.getItem('user');
    

    if (user == null || user == "" || user == "Login") {
      //no user logged in show login button
      this.loggedIn = false;
      
    }
    else {
      this.loggedIn = true;
      this.router.navigate(['dashboard']);
    }

    if (!this.loggedIn)
      this.dataservice.slideInOutUpDown = this.dataservice.slideInOutUpDown === 'out' ? 'in' : 'out';
  }

  GoToDashboard() {
    this.router.navigate(['dashboard']);
  }

  GoToRegister() {
    this.router.navigate(['register']);
  }

  search() {
    if (this.dataservice.searchCardName != null && this.dataservice.searchCardName != "")
    {
      if (this.dataservice.searchCardName.trim().length > 0)
        localStorage.setItem('searchName', this.dataservice.searchCardName);
    }
    else
    {
      localStorage.setItem('searchName', "");
    }
    if (this.dataservice.searchCardSet != null && this.dataservice.searchCardSet != "")
    {
      if (this.dataservice.searchCardSet.trim().length > 0)
        localStorage.setItem('searchSet', this.dataservice.searchCardSet);
    }
    else
    {
      localStorage.setItem('searchSet', "");
    }    
    
    this.router.navigate(["details"]);
    this.toggleSearch();
    location.reload();
  }

  GoToHome() {
    this.router.navigate([""]);
  }

  ngOnInit() {

    var id = localStorage.getItem('id');
    
    if (id == null)
    {
      this.logdIn = false;
    }
    else {
      this.logdIn = true;
    }

    console.log("Logged in? "+this.logdIn);
  }

  searchChange(newValue) {
    console.log("logging to hold api calls");
    /*
    this.dataservice.GetExternalApi('https://api.magicthegathering.io/v1/cards?name=' + newValue)
      .subscribe(data => {
        console.log(data.cards[0]);
      });
    */
  }

  setTheme(name: string) {
    this.dataservice.SwitchTheme(name);
  }
  
  GoToCollection() {
    this.closeMenu();
    this.router.navigate(["collection"]);
  }

  GoToWishlist() {
    this.closeMenu();
    this.router.navigate(["wishlist"]);
  }

  GoToUpload() {
    this.closeMenu();
    this.router.navigate(["upload"]);
  }
  
  GoToMembership() {
    this.closeMenu();
    this.router.navigate(["membership"]);
  }

  GoToMarket() {
    this.closeMenu();
    this.router.navigate(["market"]);
  }

  GoToACC() {
    this.closeMenu();
    this.router.navigate(["acc"]);
  }

  LogOut() {
    this.closeMenu();
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.dataservice.username = "";
    this.router.navigate(['']);
    location.reload();
  }

  GoToProfile() {
    this.closeMenu();
    this.router.navigate(["profile"]);
  }

  GoToCredits() {
    this.closeMenu();
    this.router.navigate(["credit"]);
    location.reload();
  }

  searching: boolean = false;
  filtering: boolean = false;

  toggleSearch() {
    if (this.searching)
      this.searching = false;
    else if (!this.searching)
      this.searching = true;
  }

  toggleFilters() {
    if (this.filtering)
      this.filtering = false;
    else if (!this.filtering)
      this.filtering = true;
  }

}
