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
        transform: 'translate3d(0, 30%, 0)'
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

  searchCardName: string = "";
  searchSetName: string = "";
  activeRoute: string;
  login: string;
  loggedIn: boolean = false;
  logdIn: boolean = false;

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
    location.reload();
  }

  GoToHome() {
    this.router.navigate([""]);
  }

  ngOnInit() {

    console.log(localStorage.getItem('id'));

    this.dataservice.activeUser = localStorage.getItem('user');
    console.log(this.dataservice.activeUser);
    
    if (this.dataservice.activeUser == null || this.dataservice.activeUser == "" || this.dataservice.activeUser == "Login")
    {
      localStorage.setItem('user', "Login");
      this.dataservice.activeUser = localStorage.getItem('user');
      this.logdIn = false;
    }
    else {
      this.dataservice.activeUser = localStorage.getItem('user');
      this.logdIn = true;
    }
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

  goToCreditPage() {
    this.router.navigate(["credit"]);
  }

}
