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
  orderIdNumber: number;
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
  cardPrice: number;

  sellId: number;

  confirmed: Boolean = false;
  beingTraded: Boolean = false;
  saleOfUser: Boolean = false;
  beingSold: Boolean = false;


  constructor(private dataservice: DataService, private router: Router, private http: Http) { }

  ngOnInit() {
    var sellId = localStorage.getItem('sellId');
    var userId = localStorage.getItem('id');

    if (sellId == null || sellId == "" || userId == null || userId == "") {
      this.router.navigate[("")];
    }
    else {
      console.log(userId);
      this.dataservice.GetLocalApi('SellList/' + sellId).subscribe(data => {
        console.log(data);
        this.sellerId = data.userId;
        this.sellerName = data.userName;
        this.sellerRating = data.rating;

        //check if card isnt being sold already
        this.cardId = data.cardId;
        this.cardPrice = data.sellPrice;
        this.cardName = data.cardName;
        this.cardSet = data.cardSet;
        this.cardCondition = data.cardCondition;

        if (data.userId == userId) {
          console.log("yours");
          this.saleOfUser = true;

          this.dataservice.GetLocalApi('Order').subscribe(data => {

            for (var i = 0; i < data.length; i++) {
              if (this.cardId == data[i].cardId) {
                console.log("someone is buying this card from you");
                this.beingSold = true;
                this.orderId = "000" + data[i].orderId.toString();
                this.orderIdNumber = data[i].orderId;
                this.orderStatus = data[i].status;
                this.sellId = data[i].sellId;

                this.dataservice.GetLocalApi('User/' + data[i].buyerId).subscribe(data => {
                  this.buyerId = parseInt(data.userId);
                  this.buyerName = data.username;
                  this.buyerRating = data.rating;
                });

                break;
              }
            }
          });
        }
        else if (data.userId != userId) {

          this.dataservice.GetLocalApi('Order').subscribe(data => {
            console.log(data);

            if (data.length == null || data.lenght == undefined) {
              console.log("no orders yet");
              this.dataservice.GetLocalApi('User/' + userId).subscribe(data => {
                this.buyerId = parseInt(data.userId);
                this.buyerName = data.username;
                this.buyerRating = data.rating;
              });
            }
            else {

              for (var i = 0; i < data.length; i++) {
                console.log(data[i].sellerId);

                if (data[i].cardId == this.cardId && data[i].buyerId == userId) {
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
                else {
                  console.log("can buy");
                }
              }
            }

          });
        }
      });


    }
  }

  confirmOrder() {

    console.log("confirming order");

    var id = localStorage.getItem('id');
    var sellId = localStorage.getItem('sellId');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      console.log(this.cardPrice);
      console.log(data.storeCredit);
      if (this.cardPrice > data.storeCredit) {
        console.log("cannot afford");
      }
      else {
        var rest_credit = data.storeCredit - this.cardPrice;

        let userbody = {
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: data.password,
          amountOfSales: data.amountOfSales,
          rating: data.rating,
          dateOfCreation: data.dateOfCreation,
          storeCredit: rest_credit,
          base64ProfileImage: data.base64ProfileImage
        }

        this.dataservice.PutLocalApi('User/' + id, userbody).subscribe(data => {
          this.postChatroomOnConfirm();

        });

        let body = {
          sellerId: this.sellerId,
          buyerId: this.buyerId,
          cardId: this.cardId,
          price: this.cardPrice,
          status: "Pending",
          nameSeller: this.sellerName,
          nameBuyer: this.buyerName,
          ratingSeller: this.sellerRating,
          ratingBuyer: this.buyerRating,
          cardName: this.cardName,
          cardSet: this.cardSet,
          sellId: sellId
        }

        this.dataservice.PostLocalApi('Order', body).subscribe(data => {
          this.orderId = "000" + data.orderId.toString();
          this.orderStatus = data.status;

          console.log(data);
          this.confirmed = true;
        });

      }
    });

  }

  postChatroomOnConfirm() {
    let body = {
      userOneId: this.sellerId,
      userTwoId: this.buyerId,
      userOneName: this.sellerName,
      userTwoName: this.buyerName
    }

    this.dataservice.PostLocalApi('Chatroom', body).subscribe(data => {

      var message_string = "User: " + this.buyerName + ", is buying your Card: " + this.cardName + " for: " + this.cardPrice + " Credits";

      let messageBody = {
        chatroomId: data.chatRoomId,
        userOneId: this.sellerId,
        userTwoId: this.buyerId,
        msgString: message_string
      }

      this.dataservice.PostLocalApi('Message', messageBody).subscribe(data => {

        //location.reload();
      });
    });
  }

  return() {
    this.router.navigate(["market"]);
  }

  confirmSale() {
    console.log(this.orderIdNumber);
  
    var id = localStorage.getItem('id');

    //add credits to user and +1 sale
    
    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      
      var add_credit = this.cardPrice + data.storeCredit;

      if (data.amountOfSales == null || data.amountOfSales == 0)
      {
        data.amountOfSales = 1;        
      }
      else
      {
        data.amountOfSales += 1;
      }
      
      
      let body_credit = {
        userId: data.userId,
        username: data.username,
        email: data.email,
        password: data.password,
        amountOfSales: data.amountOfSales,
        rating: data.rating,
        dateOfCreation: data.dateOfCreation,
        storeCredit: add_credit,
        base64ProfileImage: data.base64ProfileImage
      }

      this.dataservice.PutLocalApi('User/' + id, body_credit).subscribe(data => {
        console.log(data);
      });
      
    });

    //add card to haves of buyer
  
    var cardId = this.cardId;

    this.dataservice.GetLocalApi('Cards/' + cardId).subscribe(data => {
      let card_body = {
        cardName: data.cardName,
        cardSet: data.cardSet,
        cardCondition: data.cardCondition,
        userId: this.buyerId,
        imgBase64: data.imgBase64
      }

      this.dataservice.PostLocalApi('Cards', card_body).subscribe(data => {
        console.log(data);
      });

    //remove card from Cards
      this.http.delete('/api/Cards/' + this.cardId).subscribe(data => {
        console.log(data);
      });
    });

    //remove sell listing
    var sellId = localStorage.getItem('sellId');
    this.http.delete('/api/SellList/' + sellId).subscribe(data => {
      console.log(data);
    });

    //delete order
    var orderId = this.orderIdNumber;

    this.http.delete('/api/Order/' + orderId).subscribe(data => {
      console.log(data);
      
    });
  }
}
