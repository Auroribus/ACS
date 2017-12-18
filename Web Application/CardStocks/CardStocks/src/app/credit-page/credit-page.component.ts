import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-credit-page',
  templateUrl: './credit-page.component.html',
  styleUrls: ['./credit-page.component.css']
})
export class CreditPageComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  numberCredits: string;

  ngOnInit() {
  }

  addCredits(number) {
    console.log(number);
          
    var id = localStorage.getItem('id');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      
      var newStoreCredit = parseInt(data.storeCredit) + number;
      
    let body = {
      userId: id,
      username: data.username,
      email: data.email,
      password: data.password,
      amountOfSales: data.amountOfSales,
      rating: data.rating,
      dateOfCreation: data.dateOfCreation,
      storeCredit: newStoreCredit
    }

    this.dataservice.PutLocalApi('User/' + id, body).map(res => res.json()).subscribe(data => {
      //always returns null / status 204
      location.reload();
    });
    });
  }

}
