import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  cards: string[] = [];
  latestCardsNumber: number = 10;
  imagesLoaded: boolean;
  constructor(private dataservice: DataService) {
  }

  ngOnInit() {

    var date = new Date();
    var fullDate;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    fullDate = day + "/" + month + "/" + year;
    

    console.log(fullDate);

    this.imagesLoaded = false;

    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {

        if (data.length < 10)
        {
          this.latestCardsNumber = data.length;
        }
        else
        {
          this.latestCardsNumber = 10;
        }

        console.log(data);

        if (data instanceof Array) {

          var latest = data.length - 1;

          for (var i = 0; i < this.latestCardsNumber; i++)
          {
            var index = latest - i;
            this.cards.push(data[index]);
          }

          this.imagesLoaded = true;
        }
      });
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }
}
