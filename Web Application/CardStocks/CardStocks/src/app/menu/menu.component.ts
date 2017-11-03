import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  GoToAccount() {
      console.log("Go To Account");
  }

  GoToLogin() {
      console.log("Go To Login");
  }

  GoToShoppingCart() {
      console.log("Go To Shopping Cart");
  }

  GoToBuy() {
      console.log("Go To Buy");
  }

  GoToSell() {
      console.log("Go To Sell");
  }

  GoToCollection() {
      console.log("Go To Collection");
  }

  GoToWishlist() {
      console.log("Go To Wishlist");
  }

  GoToUpload() {
      console.log("Go To Upload");
  }

}
