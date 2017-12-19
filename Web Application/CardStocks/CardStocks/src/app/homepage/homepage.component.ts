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
  latestCardsNumber: number = 10;
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
    

    console.log(fullDate);

    this.imagesLoaded = false;

    this.dataservice.GetLocalApi("Cards")
      .subscribe(carddata => {
        this.cards = carddata;
        this.imagesLoaded = true;
      });

    this.dataservice.GetLocalApi('SellList').subscribe(selldata => {
      this.sellListings = selldata;
    });

    this.dataservice.GetLocalApi('BuyList').subscribe(buydata => {
      this.buyListings = buydata;
    });
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }
}
