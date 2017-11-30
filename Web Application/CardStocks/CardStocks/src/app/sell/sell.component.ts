import { Component, OnInit } from '@angular/core';
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


  sellListings: string[];

  addBuyListing: boolean = true;
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

}
