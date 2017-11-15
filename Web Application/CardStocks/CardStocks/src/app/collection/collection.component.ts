import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

let body;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  animations: [
    trigger('showImage', [
      state('in', style({
        transform: 'translate3d(0, 100px, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('in => out', animate('0ms ease-in-out')),
      transition('out => in', animate('0ms ease-in-out'))
    ]),
  ],
})
export class CollectionComponent implements OnInit {

  constructor(private dataservice: DataService, private route: ActivatedRoute, private http: Http, private change: ChangeDetectorRef) { }

  collectionName: string;
  cards: string[] = [];

  cName: string;
  cSet: string;
  cRarity: string;

  toggleImageState() {
    // 1-line if statement that toggles the value:
    this.dataservice.showImage = this.dataservice.showImage === 'out' ? 'in' : 'out';
  }
  
  collections: string[] = [];

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  mouseHoverEnter(name) {
    console.log("Enter: " + name);
    this.toggleImageState();
  }

  mouseHoverExit() {
    this.toggleImageState();
  }

  ngOnInit() {
    this.dataservice.GetLocalApi("Collections")
      .subscribe(data => {
        this.collections = data;
      });

    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        this.cards = data;
      });
  }

  addCard() {

    if (this.cName == null || this.cName == "" || this.cSet == null || this.cSet == "")
    {
      console.log("field empty");
    }
    else
    {
      this.newCard();
    }    
  }

  newCard()
  {
    body = {
      cardName: this.cName,
      cardSet: this.cSet
    }

    this.dataservice.PostLocalApi('Cards', body).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }

  addCollection() {
    if (this.collectionName == null || this.collectionName == "" || this.collectionName.length < 5)
    {     
      console.log("empty field");
    }
    else
    {
        this.newCollection();
    }
  }

  newCollection()
  {
    body = {
      CollectionNumber: 1.007,
      CollectionName: this.collectionName,
      UserID: 1
    }
    
    this.dataservice.PostLocalApi('Collections', body).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }

  sendColItem(id) {
    console.log(id);

    this.dataservice.GetLocalApi("Collections/" + id)
      .subscribe(data => {
        console.log(data);
      });
  }

  sendCardItem(id) {
    //console.log(id);

    this.dataservice.GetLocalApi("Cards/" + id)
      .subscribe(data => {
        //console.log(data);
      });
  }

}
