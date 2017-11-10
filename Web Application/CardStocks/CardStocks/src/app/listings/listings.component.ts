import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
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
   
  constructor(private http : Http) { }

  ngOnInit() {
    this.http.get('/api/BuyList')
      .map(res => res.json())
      .subscribe(data => {
        this.BuyListing = data;
        console.log(this.BuyListing);
      });

    this.http.get('/api/SellList')
      .map(res => res.json())
      .subscribe(data => {
        this.SellListing = data;
        console.log(this.SellListing);
      });
  }

}
