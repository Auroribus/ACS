import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

let body;
var SellListing = [];
var SellListings = [];

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
  BuyListing: string[];
  SellListingPrices: string[] = [];
  SellListingNames: string[] = [];
  
  sellPrice: number;
  cardName: string;

  constructor(private http: Http, private dataservice: DataService) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {

    this.GetBuyListings();
    this.GetSellListings();
  }

  GetBuyListings() {
    this.dataservice.GetLocalApi("BuyList")
      .subscribe(data => {
        //console.log(data);
        this.BuyListing = data;
      });
  }

  GetSellListings() {
    this.dataservice.GetLocalApi("SellList")
      .subscribe(data => {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
          var sellPrice = data[i].sellPrice;


          this.dataservice.GetLocalApi('Cards/' + data[i].cardId)
            .subscribe(data => {
              console.log(data.cardName);
              cardName = data.cardName;

              SellListing = [
                sellPrice = sellPrice,
                cardName = cardName
              ]

              SellListings.push(SellListing);

            }
            );


        }
        SellListings;
        console.log(SellListings);
      });
  }

  getCardInfo(cardId) {
    
  }

}
