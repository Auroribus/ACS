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

var BuyListings = [];
var SellListings = [];

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  userID: number;
  cardID: number;

  BuyListing: string[];
  SellListing: string[];
  sellPrice: number;
  cardName: string;

  constructor(private http: Http, private dataservice: DataService) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
    //Change this to logged in userid
    this.userID = 1;
    this.GetBuyListings();
    this.GetSellListings();
  }
  

  GetBuyListings() {

    this.dataservice.GetLocalApi('BuyList')
      .subscribe(data => {
        //console.log(data[0]);
        this.LoopData(data, BuyListings);
        this.BuyListing = BuyListings;
      });
  }

  GetSellListings() {
    this.dataservice.GetLocalApi("SellList")
      .subscribe(data => {
        //console.log(data);
        this.LoopData(data, SellListings);
        this.SellListing = SellListings;
      });     
  }

  LoopData(data, array)
  {
    for (var i = 0; i < data.length; i++) {
      if (data[i].userId == this.userID) {
        //console.log(data[i]);
        array.push(data[i]);
      }
    }   
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
