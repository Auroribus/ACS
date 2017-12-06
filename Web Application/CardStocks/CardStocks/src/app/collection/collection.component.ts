import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ExportToCSV } from "@molteni/export-csv";

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

  constructor(private router: Router, private dataservice: DataService, private route: ActivatedRoute, private http: Http, private change: ChangeDetectorRef) { }

  collectionName: string;
  cards: string[] = [];
  cardImages: string;

  cName: string;
  cSet: string;
  cRarity: string;
  cNameSearch: string;
  cCondition: string;
  sellPrice: number = 12.04;
  username: string;

  imgSrc: string;
  imageSource: string = "assets/Loading.png";

  listView: Boolean = true;
  addingCard: Boolean = false;
  hoverImage: Boolean = false;

  imageSrc: string;
  base64textString: string;


  ngOnInit() {

    this.username = localStorage.getItem('user');
    if (this.username == null || this.username == "" || this.username == "Login") {
      this.router.navigate([""]);
    }
    else {


      this.dataservice.GetLocalApi("Collections")
        .subscribe(data => {
          this.collections = data;
        });

      this.dataservice.GetLocalApi("Cards")
        .subscribe(data => {
          if (data instanceof Array) {
            this.cards = data;
            console.log(data);
          }
        });
    }
  }
  
  sortByName() {
    this.dataservice.GetLocalApi("Cards")
      .subscribe(data => {
        if (data instanceof Array) {
          this.cards = [];
          var newEl = data[0].cardName;
          var first;

          for (var i = 0; i < data.length; i++)
          {
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
    if (this.listView)
    {
      return "black";
    }
    else if (!this.listView)
    {
      return "gray";
    }
  }

  getColorTile() {
    if (this.listView)
    {
      return "gray";
    }
    else if (!this.listView)
    {
      return "black";
    }
  }

  sellCard(cardId, cardName) {

    console.log(cardId);
    console.log(cardName);

    /*[Key]
    public int SellId { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int CardId { get; set; }

    [Required]
    public string CardName { get; set; }

    [Required]
    public double SellPrice { get; set; }
    */

    let body = {
      UserId: 1,
      CardId: cardId,
      CardName: cardName,
      SellPrice: this.sellPrice
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/SellList', body, { headers: headers })
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        //location.reload();
      }); 
  }

  searchCard() {
    console.log(this.cNameSearch);

    if (this.cNameSearch == null || this.cNameSearch == "")
    {
      this.cards = [];

      this.dataservice.GetLocalApi("Cards")
        .subscribe(data => {
          if (data instanceof Array) {
            this.cards = data;
            console.log(data);
          }
        });

    }
    else if (this.cNameSearch.trim().length > 0)
    {
      this.cards = [];
      this.dataservice.GetLocalApi('Cards')
        .subscribe(data => {
          for (var i = 0; i < data.length; i++)
          {
            if (data[i].cardName.toLowerCase().includes(this.cNameSearch.toLowerCase()))
            {
              console.log("card found add to array");
              this.cards.push(data[i]);
            }
          }
        });
    }
  }

  toggleImageState() {
    // 1-line if statement that toggles the value:
    this.dataservice.showImage = this.dataservice.showImage === 'out' ? 'in' : 'out';
  }
  
  collections: string[] = [];

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  mouseHoverEnter(id) {
    this.hoverImage = true;

    this.GetImg(id);

    //this.toggleImageState();
  }

  GetImg(id) {
    this.dataservice.GetLocalApi('Cards/' + id)
      .subscribe(data => {
        console.log(data);
        this.imageSource = data.imgBase64;
      });
  }

  mouseHoverExit() {
    this.hoverImage = false;

    //this.toggleImageState();
  }


  addCard() {

    if (this.cName == null || this.cName == "" || this.cSet == null || this.cSet == "")
    {
      console.log("field empty");
    }
    else if (this.cCondition == null || this.cCondition == "")
    {

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
      cardSet: this.cSet,
      cardCondition: this.cCondition,
      userId: 1,
      imgBase64: "data:image/png;base64," + this.base64textString
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

  sendCardItem(cardId) {
    console.log(cardId);
    /*
    this.dataservice.GetLocalApi("Cards/" + cardId)
      .subscribe(data => {
        console.log(data);
      });*/
  }

  removeCard(cardId) {
    console.log("remove: " + cardId);
    this.http.delete("/api/Cards/" + cardId)
      .subscribe(data => {
        console.log(data);
        location.reload();
      });
  }

  editCard(cardId) {
    console.log("edit: " + cardId);
  }

  exportCards() {
    var exporter = new ExportToCSV();
    console.log(JSON.stringify(this.cards));
    exporter.exportColumnsToCSV(this.cards, "exportedCards", ["cardName"]);
    console.log("Exported to .csv");
  }

}
