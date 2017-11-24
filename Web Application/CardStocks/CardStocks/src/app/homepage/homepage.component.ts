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
  latestCardsNumber: number = 7;
  
  constructor(private dataservice: DataService) {
  }

  ngOnInit() {
    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        if (data instanceof Array) {

          var latest = data.length - 1;
          console.log(data[6]);

          for (var i = 0; i < this.latestCardsNumber; i++)
          {
            var index = latest - i;
            console.log(index);
            this.cards.push(data[index]);
          }

          //this.cards = data;
          console.log(this.cards);
        }
      });
  }
  
  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }
}
