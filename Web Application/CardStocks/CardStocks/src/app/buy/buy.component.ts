import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  cardPrice: number;
  cardName: string;
  cardSet: string;
  cardCondition: string;

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

  constructor(private route: ActivatedRoute, private dataservice : DataService, private http: Http) { }

  ngOnInit() {
    this.dataservice.GetLocalApi('BuyList').subscribe(data =>
    {
      console.log(data);
      this.buyListings = data;
      console.log(this.buyListings)
    });
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
      //Change user id when logg in sessions done
      let body = {
        UserId: 1,
        CardName: this.cardName,
        CardSet: this.cardSet,
        CardCondition: this.cardCondition,
        BuyPrice: this.cardPrice
      };

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('/api/BuyList', body, { headers: headers })
        .map(response => response.json())
        .subscribe(data => { 
          console.log(data);
          location.reload();
          });  
    }
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

}
