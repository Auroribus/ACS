import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactionListSelling: string[];
  transactionListBuying: string[];
  
  constructor(private router : Router, private dataservice: DataService) { }

  ngOnInit() {
    var userId = localStorage.getItem('id');
    console.log(userId);
    this.transactionListBuying = [];
    this.transactionListSelling = [];

    this.dataservice.GetLocalApi('Order').subscribe(data => {
      //console.log(data);
      this.transactionListBuying = [];
      this.transactionListSelling = [];
      for (var i = 0; i < data.length; i++)
      {
        if (data[i].buyerId == userId)
        {
          this.transactionListBuying.push(data[i]);
          console.log(this.transactionListBuying);
        }
        if (data[i].sellerId == userId)
        {
          this.transactionListSelling.push(data[i]);
          console.log(this.transactionListSelling);
        }
      }
    });
  }

  goToOrder(orderId, sellId) {
    console.log(orderId);
    localStorage.setItem('orderId', orderId);
    localStorage.setItem('sellId', sellId);
    this.router.navigate(['order']);
  }

}
