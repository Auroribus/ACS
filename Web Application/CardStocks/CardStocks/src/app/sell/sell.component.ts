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

  cards: string[] = [];
  sellListings: string[] = [];

  addSellListing: boolean = false;
  tableLoaded: boolean = false;

  cardPrice: number;
  username: string;

  //select card then add price

  constructor(private router: Router, private route: ActivatedRoute, private dataservice: DataService, private http: Http) { }

  ngOnInit() {
    
    var id = localStorage.getItem('id');
    if (id == null || id == "") {
      this.router.navigate([""]);
    }
    else
    {

    this.dataservice.GetLocalApi('SellList').subscribe(data => {
      console.log(data);
      this.sellListings = data;
      });
      
    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        if (data instanceof Array) {

          var id = localStorage.getItem('id');

          for (var i = 0; i < data.length; i++)
          {
            if (data[i].userId == id) {
              this.cards.push(data[i]);
            }
          }
        }
      });
      
    }
  }

  addSell() {
    if (this.cardPrice == null || this.cardPrice == 0) {

    }
    else {

      var id = localStorage.getItem('id');
      //Change user id when logg in sessions done
      let body = {
        UserId: id,
        CardId: 1,
        sellPrice: this.cardPrice
      };

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('/api/SellList', body, { headers: headers })
        .map(response => response.json())
        .subscribe(data => {
          //console.log(data);
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

  buyCard(sellId) {
    localStorage.setItem('sellId', sellId);
    this.router.navigate(['order']);
  }

}
