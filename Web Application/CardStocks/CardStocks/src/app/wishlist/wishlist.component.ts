import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ExportToCSV } from "@molteni/export-csv";

let body;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  animations: [
    trigger('showImage', [
      state('in', style({
        transform: 'translate3d(0, 20%, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('in => out', animate('0ms ease-in-out')),
      transition('out => in', animate('0ms ease-in-out'))
    ]),
  ],
})
export class WishlistComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService, private route: ActivatedRoute, private http: Http, private change: ChangeDetectorRef) { }

  collectionName: string;
  cards: string[] = [];
  cardImages: string;

  cName: string;
  cSet: string;
  cRarity: string;
  cNameSearch: string;
  cCondition: string;
  username: string;

  imgSrc: string;
  imageSource: string = "assets/LoadingGif.gif";

  listView: Boolean = true;
  addingCard: Boolean = false;
  imageSrc: string;
  base64textString: string;

  editName: string;
  editSet: string;
  editCondition: string;
  editingCard: Boolean = false;
  CardID: number;
  ImgBase64: string;


  ngOnInit() {

    this.username = localStorage.getItem('user');
    if (this.username == null || this.username == "" || this.username == "Login") {
      this.router.navigate([""]);
    }
    else {

      this.dataservice.GetLocalApi("WishLists")
        .subscribe(data => {
          this.collections = data;
        });

      this.dataservice.GetLocalApi("WishCards")
        .subscribe(data => {
          if (data instanceof Array) {

            var id = localStorage.getItem('id');

            for (var i = 0; i < data.length; i++) {
              if (data[i].userId == id) {
                this.cards.push(data[i]);
              }
            }

          }
        });
    }
  }

  confirmEditCard() {

    //console.log(this.CardID);

    var id = localStorage.getItem('id');

    let body = {
      cardId: this.CardID,
      cardName: this.editName,
      cardSet: this.editSet,
      cardCondition: this.editCondition,
      imgBase64: this.ImgBase64,
      userId: id
    }

    this.dataservice.PutLocalApi('Cards/' + this.CardID, body).map(res => res.json()).subscribe(data => {
      //always returns null / status 204
      location.reload();
    });

    this.editingCard = false;
  }

  editCard(cardId) {

    this.CardID = cardId;

    this.editingCard = true;

    this.dataservice.GetLocalApi('Cards/' + this.CardID).subscribe(data => {

      console.log(data);

      this.editName = data.cardName;
      this.editSet = data.cardSet;
      this.editCondition = data.cardCondition;
      this.ImgBase64 = data.imgBase64;
    });
  }

  sortByName() {
    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        if (data instanceof Array) {
          this.cards = [];
          var newEl = data[0].cardName;
          var first;

          for (var i = 0; i < data.length; i++) {
            if (newEl > data[i].cardName) {
              newEl = data[i].cardName;
              first = data[i];
            }
          }


          this.cards.push(first);

          console.log(this.cards);

        }
      });
    /*
    let newEl = this.cards[0].cardName;

    for (var i = 1; this.cards.length; i++)
    {
      if (newEl > this.cards[i].cardName)
      {
        newEl = this.cards[i].cardName;
      }
    }
    console.log("First: " + newEl);
    */
  }

  sortBySet() {

  }

  sortByCondition() {

  }

  handleFileSelect(evt) {

    console.log(evt);

    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      var r2 = new FileReader();

      r2.onload = (e: any) => {
        this.imageSrc = e.target.result;
      }

      r2.readAsDataURL(evt.target.files[0]);

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);

    }

  }

  _handleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //console.log(this.base64textString);

  }

  toggleListView() {
    this.listView = true;
  }

  toggleTileView() {
    this.listView = false;
  }

  toggleAddCard() {
    if (this.addingCard)
      this.addingCard = false;
    else if (!this.addingCard)
      this.addingCard = true;
  }

  getColorList() {
    if (this.listView) {
      return "black";
    }
    else if (!this.listView) {
      return "gray";
    }
  }

  getColorTile() {
    if (this.listView) {
      return "gray";
    }
    else if (!this.listView) {
      return "black";
    }
  }

  searchCard() {
    console.log(this.cNameSearch);

    if (this.cNameSearch == null || this.cNameSearch == "") {
      this.cards = [];

      this.dataservice.GetLocalApi("Cards")
        .subscribe(data => {
          if (data instanceof Array) {
            this.cards = data;
            console.log("found");
          }
        });

    }
    else if (this.cNameSearch.trim().length > 0) {
      this.cards = [];
      this.dataservice.GetLocalApi('Cards')
        .subscribe(data => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].cardName.toLowerCase().includes(this.cNameSearch.toLowerCase())) {
              console.log("card found add to array");
              this.cards.push(data[i]);
            }
          }
        });
    }
  }

  collections: string[] = [];

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  removeCard(cardId) {
    console.log("remove: " + cardId);
    this.http.delete("/api/Cards/" + cardId)
      .subscribe(data => {
        console.log(data);
        location.reload();
      });
  }

  exportCards() {
    var exporter = new ExportToCSV();
    console.log(JSON.stringify(this.cards));
    exporter.exportColumnsToCSV(this.cards, "exportedCards", ["cardName"]);
    console.log("Exported to .csv");
  }

}
