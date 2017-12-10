import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

let body;

var cardName;
var sellPrice;

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  userID: number;
  cardID: number;

  BuyListing: string[] = [];
  SellListing: string[] = [];
  sellPrice: number;
  cardName: string;

  username: string;

  constructor(private router: Router, private http: Http, private dataservice: DataService) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {

    this.username = localStorage.getItem('user');
    if (this.username == null || this.username == "" || this.username == "Login") {
      this.router.navigate([""]);
    }
    else {

      //Change this to logged in userid
      this.userID = parseInt(localStorage.getItem('id'));
      this.GetBuyListings();
      this.GetSellListings();
    }
  }
  

  GetBuyListings() {

    this.dataservice.GetLocalApi('BuyList')
      .subscribe(data => {
        //console.log(data[0]);
        var id = localStorage.getItem('id');

        for (var i = 0; i < data.length; i++) {
          if (data[i].userId == id) {
            //console.log(data[i]);
            this.BuyListing.push(data[i]);
          }
        }  
      });
  }

  GetSellListings() {
    this.dataservice.GetLocalApi("SellList")
      .subscribe(data => {
        //console.log(data);

        var id = localStorage.getItem('id');

        for (var i = 0; i < data.length; i++) {
          if (data[i].userId == id) {
            //console.log(data[i]);
            this.SellListing.push(data[i]);
          }
        }          
      });     
  }

  RemoveFromSellList(sellId) {
    console.log(sellId);
    this.RemoveListing('SellList', sellId);
  }

  RemoveFromBuyList(buyId) {
    console.log(buyId);
    this.RemoveListing('BuyList', buyId);
  }

  RemoveListing(apiName, id) {
    this.http.delete("/api/" +apiName +"/" + id)
      .subscribe(data => {
        console.log(data);
        location.reload();
      });
  }

  getCardInfo(cardId) {
    
  }

}
