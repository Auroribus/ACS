import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  buyListings: string[];
    
  addBuyListing: boolean = false;
  tableLoaded: boolean = false;

  cardPrice: number;
  cardName: string;
  cardSet: string;
  cardCondition: string;

  username: string;


  toggleAdd() {
    if (this.addBuyListing)
    {
      this.addBuyListing = false;
    }
    else if (!this.addBuyListing)
    {
      this.addBuyListing = true;
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private dataservice : DataService, private http: Http) { }

  ngOnInit() {

    this.username = localStorage.getItem('user');

    if (this.username == null || this.username == "" || this.username == "Login") {
      this.router.navigate([""]);
    }
    else {

      this.dataservice.GetLocalApi('BuyList').subscribe(data => {

        this.buyListings = [];

        this.buyListings = data;
      });
    }
  }

  addBuy() {
    if (this.cardPrice == null || this.cardPrice == 0) {

    }
    else if (this.cardName == null || this.cardName == "")
    {

    }
    else if (this.cardSet == null || this.cardSet == "")
    {
      
    }
    else if (this.cardName.trim().length > 0 && this.cardSet.trim().length > 0)
    {
      var id = localStorage.getItem('id');

      this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
        let body = {
          UserId: id,
          CardName: this.cardName,
          CardSet: this.cardSet,
          CardCondition: this.cardCondition,
          BuyPrice: this.cardPrice,
          userName: data.username,
          userRating: data.rating
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/BuyList', body, { headers: headers })
          .map(response => response.json())
          .subscribe(data => {
            console.log(data);
            location.reload();
          }); 
      });
    }
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }


  searchValue: string = "name";
  searchObject: string;

  searchChange(value) {

    this.searchValue = value;
    console.log(this.searchValue);
  }

  search() {

    this.buyListings = [];
    var SearchObject = this.searchObject.toLowerCase();

    if (this.searchValue == 'name') {
      this.dataservice.GetLocalApi('BuyList').subscribe(data => {

        for (var i = 0; i < data.length; i++) {
          var cardName = data[i].cardName.toLowerCase();

          if (cardName.includes(SearchObject)) {
            console.log("found");
            this.buyListings.push(data[i]);
          }
        }

      });
    }
    else if (this.searchValue == 'set') {
      this.dataservice.GetLocalApi('BuyList').subscribe(data => {

        for (var i = 0; i < data.length; i++) {
          var cardSet = data[i].cardSet.toLowerCase();

          if (cardSet.includes(SearchObject)) {
            console.log("found");
            this.buyListings.push(data[i]);
          }
        }

      });
    }
    else if (this.searchValue == 'condition') {
      this.dataservice.GetLocalApi('BuyList').subscribe(data => {

        for (var i = 0; i < data.length; i++) {
          var cardCondition = data[i].cardCondition.toLowerCase();

          if (cardCondition.includes(SearchObject)) {
            console.log("found");
            this.buyListings.push(data[i]);
          }
        }

      });
    }


  }
}
