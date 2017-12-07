import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  cards: string[];
  sellListings: string[];
  userName: string[] = [];
  rating: number[] = [];
  cardSet: string[] = [];
  cardCondition: string[] = [];

  addSellListing: boolean = false;
  tableLoaded: boolean = false;

  cardPrice: number;
  username: string;

  //select card then add price

  constructor(private router: Router, private route: ActivatedRoute, private dataservice: DataService, private http: Http) { }

  ngOnInit() {

    this.username = localStorage.getItem('user');
    if (this.username == null || this.username == "" || this.username == "Login") {
      this.router.navigate([""]);
    }
    else
    {

    this.dataservice.GetLocalApi('SellList').subscribe(data => {
      console.log(data);
      this.sellListings = data;

      this.cardCondition = [];
      this.cardSet = [];
      this.userName = [];
      this.rating = [];

      for (var i = 0; i < data.length; i++) {
        
        this.dataservice.GetLocalApi('User/' + data[i].userId).subscribe(userdata => {
          this.userName.push(userdata.username);
          this.rating.push(userdata.rating);
        });


        this.dataservice.GetLocalApi('Cards/' + data[i].cardId).subscribe(carddata => {
          if (carddata.cardSet == null || carddata.cardSet == "") {
            this.cardCondition.push("---");
          }
          else {
            this.cardSet.push(carddata.cardSet);
          }

          if (carddata.cardCondition == null || carddata.cardCondition == "")
          {
            this.cardCondition.push("---");
          }
          else {
            this.cardCondition.push(carddata.cardCondition);
          }

          //show html after all of the table contents have been loaded properly
          //if (this.cardCondition[data.length - 1] != null) {
          //  console.log("not null");
          //  this.tableLoaded = true;
          //}

        });
      }
      
      });
      
    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        if (data instanceof Array) {
          this.cards = data;
          //console.log(data);
        }
      });
      
    }
  }

  addBuy() {
    if (this.cardPrice == null || this.cardPrice == 0) {

    }
    else {
      //Change user id when logg in sessions done
      let body = {
        UserId: 1,
        CardId: 1,
        sellPrice: this.cardPrice
      };

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('/api/SellList', body, { headers: headers })
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



  toggleAdd() {
    if (this.addSellListing) {
      this.addSellListing = false;
    }
    else if (!this.addSellListing) {
      this.addSellListing = true;
    }
  }

}
