import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

let body;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private dataservice: DataService, private route: ActivatedRoute, private http: Http, private change: ChangeDetectorRef) { }

  collectionName: string;
  cards: string[] = [];

  cName: string;
  cSet: string;
  cRarity: string;
  
  collections: string[] = [];

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
    this.dataservice.GetLocalApi("Collections")
      .subscribe(data => {
        this.collections = data;
      });

    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        this.cards = data;
        console.log(data);
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
    });
  }

  sendItem(name) {
    console.log(name);
  }

}
