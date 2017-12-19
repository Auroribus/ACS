import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ActivatedRoute, RoutesRecognized } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  orderId: string;
  orderStatus: string;

  sellerId: number;
  sellerName: string;
  sellerRating: number;

  buyerId: number;
  buyerName: string;
  buyerRating: number;

  cardId: number;
  cardName: string;
  cardSet: string;
  cardCondition: string;
  cardPrice: string;

  confirmed: Boolean = false;
  beingTraded: Boolean = false;


  constructor(private dataservice : DataService, private router: Router) { }

  ngOnInit() {
    var sellId = localStorage.getItem('sellId');
    var userId = localStorage.getItem('id');

    if (sellId == null || sellId == "" || userId == null || userId == "") {
      this.router.navigate[("")];
    }
    else {
      this.dataservice.GetLocalApi('SellList/' + sellId).subscribe(data => {
        
        this.sellerId = data.userId;
        this.sellerName = data.userName;
        this.sellerRating = data.rating;

        //check if card isnt being sold already
        this.cardId = data.cardId;
        this.cardPrice = data.sellPrice;
        this.cardName = data.cardName;
        this.cardSet = data.cardSet;
        this.cardCondition = data.cardCondition;

        this.dataservice.GetLocalApi('Order').subscribe(data => {
          for (var i = 0; i < data.length; i++)
          {
            //console.log(data);
            if (data[i].cardId == this.cardId && data[i].buyerId == userId)
            {
              console.log("card is already being traded by you");
              this.orderId = "000" + data[i].orderId.toString();
              this.orderStatus = data[i].status;
              this.confirmed = true;
              break;
            }
            else if (data[i].cardId == this.cardId && data[i].buyerId != userId) {
              console.log("card is already being traded by someone else");

              this.beingTraded = true;
              break;
            }
          }
        });

      });

      this.dataservice.GetLocalApi('User/' + userId).subscribe(data => {
        this.buyerId = parseInt(userId);
        this.buyerName = data.username;
        this.buyerRating = data.rating;
      });



      /* order class
      public int OrderId { get; set; }
    public int SellerId { get; set; }
    public int BuyerId { get; set; }
    public int CardId { get; set; }
    public double Price { get; set; }
    public string Status { get; set; }
    public string NameSeller { get; set; }
    public string NameBuyer { get; set; }
    public double RatingSeller { get; set; }
    public double RatingBuyer { get; set; }
*/
    }
  }

  confirmOrder() {
    let body = {
      sellerId: this.sellerId,
      buyerId: this.buyerId,
      cardId: this.cardId,
      price: this.cardPrice,
      status: "Pending",
      nameSeller: this.sellerName,
      nameBuyer: this.buyerName,
      ratingSeller: this.sellerRating,
      ratingBuyer: this.buyerRating
    }

    this.dataservice.PostLocalApi('Order', body).subscribe(data => {
      this.orderId = "000" + data.orderId.toString();
      this.orderStatus = data.status;

      console.log(data);
      this.confirmed = true;
    });
  }

  return() {
    this.router.navigate(["market"]);
  }
}
