import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  cards: string[] = [];
  buyListings: string[] = [];
  sellListings: string[] = [];
  maxNumber: number = 10;
  imagesLoaded: boolean;
  constructor(private dataservice: DataService) {
  }

  ngOnInit() {

    var date = new Date();
    var fullDate;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    fullDate = day + "/" + month + "/" + year;
    
    console.log("Date: " + fullDate);

    this.imagesLoaded = false;

    this.dataservice.GetLocalApi("Cards")
      .subscribe(carddata => {

        //console.log(carddata);

        var arraySize = carddata.length;
        this.cards = [];
        this.cards = carddata;
        /*
        console.log(arraySize);

        for (var i = (arraySize - this.maxNumber); i < arraySize; i++)
        {
          this.cards.push(carddata[i]);          
        }
        */
        this.imagesLoaded = true;
      });

    this.dataservice.GetLocalApi('SellList').subscribe(selldata => {

      var arraySize = selldata.length;
      this.sellListings = [];

      //for (var i = (arraySize - this.maxNumber); i < arraySize; i++) {
      //  this.sellListings.push(selldata[i]);
      //}

      this.sellListings = selldata;
    });

    this.dataservice.GetLocalApi('BuyList').subscribe(buydata => {

      var arraySize = buydata.length;
      this.buyListings = [];

      //for (var i = (arraySize - this.maxNumber); i < arraySize; i++) {
      //  this.buyListings.push(buydata[i]);
      //}

      this.buyListings = buydata;
    });
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }
}
