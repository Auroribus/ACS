import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  GoToCredits() {
    this.router.navigate(["credit"]);
    location.reload();
  }

}
