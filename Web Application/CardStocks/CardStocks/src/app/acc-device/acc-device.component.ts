import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';
import { OcrCardsService } from '../ocr-cards.service';

var GetACSdataFromDB;
var cardList = [];

@Component({
  selector: 'app-acc-device',
  templateUrl: './acc-device.component.html',
  styleUrls: ['./acc-device.component.css']
})
export class AccDeviceComponent implements OnInit {

  cards: object[] = [];

  device_string: string;
  connected: boolean;
  started: boolean;
  image_src: string = "assets/LoadingGif5.gif";

  cardName: string = "Ajani Steadfast";
  cardSet: string[] = [];

  constructor(private dataservice: DataService, private router: Router, private ocr : OcrCardsService, private http: Http) { }

  ngOnInit() {
    var id = localStorage.getItem('id');

    /* Uncomment to clear ACC Database
    this.dataservice.GetLocalApi("Acc").subscribe(data => {
      
      for (var i = 0; i < data.length; i++) {
        this.http.delete('api/Acc/' + data[i].accId).subscribe(data => console.log(data));
      }
      
    });
    */

    if (id == null)
    {
      this.router.navigate([""]);
    }
    else {

      this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
        if (data.accConnectionString == null || data.accConnectionString == "")
        {
          console.log("empty connection string, no device found");
          this.device_string = "No Device was Found";
        }
        else
        {
          this.device_string = data.accConnectionString;
          
        }
      });
      
    }
  }

  ngOnDestroy() {
    Observable.interval()
  }

  connectWithDevice() {
    this.connected = true;
    localStorage.setItem('connectionString', this.device_string);
  }

  return() {
    this.connected = false;
  }

  index_array: number = 0;
  feedback_start: string;
  arraysizeChanged: boolean = false;

  start() {

    this.dataservice.setFeedbackTextColor("green");
    this.feedback_start = "Starting...";

    this.started = true;
    this.cards = [];

    var timer = 2000;

    var connection = localStorage.getItem('connectionString');
    
    GetACSdataFromDB = Observable.interval(timer * 2).subscribe(x => {

      this.feedback_start = "";
      this.dataservice.GetLocalApi('Acc').subscribe(data => {
        
        if (connection == data[this.index_array].accConnectionString)
        {
          //console.log(this.ocr.cardNameLoaded);

          var array_size = data.length;

          if (!this.ocr.cardNameLoaded) {
            this.image_src = "data:image/png;base64," + data[this.index_array].imageBase64String;
            this.ocr.getName_fromFile(data[this.index_array].imageBase64String);
          }

          //remove when using OCR
          //this.ocr.cardNameLoaded = true;

          if (this.ocr.cardNameLoaded) {
            this.ocr.cardNameLoaded = false;
           
            this.cardSet = [];

            this.dataservice.GetExternalApi('https://api.magicthegathering.io/v1/cards?name=' + this.ocr.cardName)
              .subscribe(data => {

                //console.log(data);

                for (var i = 0; i < data.cards[0].printings.length; i++)
                  this.cardSet.push(data.cards[0].printings[i].toLowerCase());
              });
            //add options for sets with symbol
            cardList.push(
              {
                cardName: this.ocr.cardName,
                cardImage: "data:image/png;base64," + data[this.index_array].imageBase64String,
                cardSet: this.cardSet,
                actualSet: "---"
              }
            );

            //console.log(this.cardSet);

            this.cards.push(cardList[this.index_array]);
            this.index_array += 1;

            if (this.index_array > (array_size - 1)) {
              this.dataservice.setFeedbackTextColor("green");
              this.feedback_start = "Finished";
              GetACSdataFromDB.unsubscribe();
            }
          }
        }
        else {
          console.log("not the same");
        }
      })
    });
  }

  stop() {
    GetACSdataFromDB.unsubscribe();
    this.index_array = 0;
    this.dataservice.setFeedbackTextColor("red");
    this.feedback_start = "Stopping...";
    this.started = false;
  }

  POST_CardsToDB() {

    cardList = this.cards;
    console.log(cardList);

    var id = localStorage.getItem('id');
    this.dataservice.setFeedbackTextColor("green");
    this.feedback_start = "Adding Cards to your Haves";
    for (var i = 0; i < cardList.length; i++)
    {     
      
      let body = {
        cardName: cardList[i].cardName,
        cardSet: cardList[i].actualSet,
        userId: id,
        imgBase64: cardList[i].cardImage,
        cardCondition: "---",
      }

      this.dataservice.PostLocalApi('Cards', body).subscribe(data => console.log(data));
    }
  }
  
  set_cardSet(item, index) {    

    console.log(this.cards);

    cardList[index].actualSet = item;
    
  }

  remove_Item(index) {
    console.log(index);
  }
}
