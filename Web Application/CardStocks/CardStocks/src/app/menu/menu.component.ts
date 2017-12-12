import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
  }

  GoToAccount() {
    this.closeMenu();
    this.router.navigate(["account"]);
  }

  GoToLogin() {
    this.closeMenu();
    this.router.navigate(["login"]);
  }

  GoToShoppingCart() {
    this.closeMenu();
      console.log("Go To Shopping Cart");
  }

  GoToBuy() {
    this.closeMenu();
    this.router.navigate(["buy"]);
  }

  GoToSell() {
    this.closeMenu();
    this.router.navigate(["sell"]);
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

  GoToListings() {
    this.closeMenu();
    this.router.navigate(["listings"]);
  }

  GoToMembership() {
    this.closeMenu();
    this.router.navigate(["membership"]);
  }

  GoToMarket() {
    this.closeMenu();
    this.router.navigate(["market"]);
  }

  LogOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.dataservice.username = "";
    this.router.navigate(['']);
    location.reload();
  }

  setTheme(name: string) {
    console.log(name);
    this.dataservice.SwitchTheme(name);
  }
}
