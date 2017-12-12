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
  userName: string[] = [];
  rating: number[] = [];

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

        for (var i = 0; i < data.length; i++) {
          this.dataservice.GetLocalApi('User/' + data[i].userId).subscribe(userdata => {
            this.userName.push(userdata.username);
            this.rating.push(userdata.rating);

            //show html after all of the table contents have been loaded properly
            if (this.rating[data.length - 1] != null) {
              console.log("not null");
              this.tableLoaded = true;
            }

          });
          
        }
        
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
      //Change user id when logg in sessions done
      let body = {
        UserId: localStorage.getItem('id'),
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
