import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  GoToAccount() {
    this.router.navigate(["account"]);
  }

  GoToLogin() {
    this.router.navigate(["login"]);
  }

  GoToShoppingCart() {
      console.log("Go To Shopping Cart");
  }

  GoToBuy() {
    this.router.navigate(["buy"]);
  }

  GoToSell() {
    this.router.navigate(["sell"]);
  }

  GoToCollection() {
    this.router.navigate(["collection"]);
  }

  GoToWishlist() {
    this.router.navigate(["wishlist"]);
  }

  GoToUpload() {
    this.router.navigate(["upload"]);
  }

  GoToListings() {
    this.router.navigate(["listings"]);
  }

}
