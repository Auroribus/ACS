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

  editingListing: Boolean = false;
  editCardName: string;
  editCardPrice: number;

  editSell: Boolean = false;
  editSellID: number;
  editBuyID: number;
  editBuySet: string;
  editBuyCondition: string;

  constructor(private router: Router, private http: Http, private dataservice: DataService) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {

    var id = localStorage.getItem('id');
    if (id == null || id == "")
    {
      this.router.navigate([""]);
    }
    else {
      
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

  confirmEdit() {
    if (this.editSell)
    {
      console.log("send PUT to SellListing");

      this.PUT_SellListing();
    }
    else if(!this.editSell)
    {
      console.log("send PUT to BuyListing");

      this.PUT_BuyListing();
    }
  }

  PUT_SellListing() {

    var id = localStorage.getItem('id');

    let sell_body = {
      sellId: this.editSellID,
      userId: id,
      cardName: this.editCardName,
      sellPrice: this.editCardPrice
    }

    this.dataservice.PutLocalApi('SellList/' + this.editSellID, sell_body).subscribe(data => {
      location.reload()
    });

  }

  PUT_BuyListing() {

    var id = localStorage.getItem('id');
    
    let buy_body = {
      buyId: this.editBuyID,
      userId: id,
      cardName: this.editCardName,
      cardSet: this.editBuySet,
      cardCondition: this.editBuyCondition,
      buyPrice: this.editCardPrice
    }

    this.dataservice.PutLocalApi('BuyList/' + this.editBuyID, buy_body).subscribe(data => {
      location.reload()
    });
  }

  editSellListing(sellId) {
    this.editingListing = true;
    this.editSell = true;

    this.editSellID = sellId;

    this.dataservice.GetLocalApi('SellList/' + sellId).subscribe(data => {
      this.editCardName = data.cardName;
      this.editCardPrice = data.sellPrice;
      
    });
  }

  editBuyListing(buyId) {
    this.editSell = false;
    this.editingListing = true;

    this.editBuyID = buyId;

    this.dataservice.GetLocalApi('BuyList/' + buyId).subscribe(data => {
      this.editCardName = data.cardName;
      this.editCardPrice = data.buyPrice;
      this.editBuySet = data.cardSet;
      this.editBuyCondition = data.cardCondition;
    });
  }
}
