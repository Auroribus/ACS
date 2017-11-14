import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

let body;

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

  constructor(private http: Http, private dataservice: DataService) { }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {

    this.dataservice.GetLocalApi("BuyList")
      .subscribe(data => {
        console.log(data);
        this.BuyListing = data;
      });
    

    this.dataservice.GetLocalApi("SellList")
      .subscribe(data => {
        console.log(data);
        this.SellListing = data;
      });
  }

}
