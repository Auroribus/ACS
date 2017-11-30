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
  
  constructor(private dataservice: DataService) {
  }

  ngOnInit() {
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
            console.log(index);
            this.cards.push(data[index]);
          }

          //this.cards = data;
          console.log(this.cards);
        }
      });
  }

  setTheme(name: string) {
    this.dataservice.SwitchTheme(name);
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }
}
