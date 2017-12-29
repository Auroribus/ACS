import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ActivatedRoute, RoutesRecognized } from '@angular/router';
import { DataService } from '../data.service';
import { OcrCardsService } from '../ocr-cards.service';

@Component({
  selector: 'app-acc-page',
  templateUrl: './acc-page.component.html',
  styleUrls: ['./acc-page.component.css']
})
export class AccPageComponent implements OnInit {

  AccConnectionString: string;
  feedback_connect: string;

  constructor(private dataservice: DataService, private router: Router, private ocr : OcrCardsService) { }

  ngOnInit() {

    this.dataservice.GetLocalApi('Acc').subscribe(data => console.log(data));
  }

  connect() {
    if (this.AccConnectionString == null || this.AccConnectionString == "") {

      this.dataservice.setFeedbackTextColor("red");

      this.feedback_connect = "* Wrong Input for the AccConnectionString";
    }
    else
    {
      this.dataservice.setFeedbackTextColor("green");

      this.feedback_connect = "Succesfully Added";
      var id = localStorage.getItem('id');

      this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
        //Update User in DB
        let body = {
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: data.password,
          amountOfSales: data.amountOfSales,
          rating: data.rating,
          dateOfCreation: data.dateOfCreation,
          storeCredit: data.storeCredit,
          base64ProfileImage: data.base64ProfileImage,
          accConnectionString: this.AccConnectionString
        }

        this.dataservice.PutLocalApi('User/' + id, body).subscribe(data => {
          console.log(data);

          this.AccConnectionString = "";
        });
      });      
    }
  }

  getColor(color) {
    return color;
  }

  GoToAccDevice() {
    this.router.navigate(["device"]);
  }

}
