import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

//let url = "https://www.picclickimg.com/d/l400/pict/152663272756_/Magic-the-gathering-Lotus-Petal-Tempest.jpg";
//let url = "https://vignette.wikia.nocookie.net/mtg/images/7/7a/Scoria_Elemental.jpg/revision/latest?cb=20110511020909";
let url;

let body = {}

let nameCard = "";

let pathLink;

let oldNr = 0;

var CardList = [];

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  
  nameOfCard: string[];

  file: string = "";
  cardName: string = "card name";
  cardSet: string;
  cardCondition: string;
  imageSrc: string = "assets/Loading.png";
  cardList: string[];

  options: boolean = true;
  Remove: boolean = false;
  Add: boolean = false;

  addToDB() {
    this.options = false;
    this.Add = true;
    this.Remove = false;
  }

  removeFromDB() {
    this.options = false;
    this.Remove = true;
    this.Add = false;
  }

  SendToDB() {
    body = {
      cardName: this.cardName,
      cardSet: this.cardSet,
      cardCondition: this.cardCondition,
      userId: 1,
      imgBase64: "data:image/png;base64," + this.base64textString
    }

    this.dataservice.PostLocalApi('Cards', body).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }

  DelFromDB(cardId) {
    console.log("remove from db");
    this.http.delete('/api/Cards/' + cardId)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        location.reload();
      });
  }

  Options() {
    this.options = true;
    this.Remove = false;
    this.Add = false;
  }
  
  constructor(private http: Http, private dataservice: DataService, private router: Router) {
    
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
  }

  private base64textString: String = "";

  handleFileSelect(evt) {

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
    //console.log(btoa(binaryString));

    this.getName(this.base64textString);
  }

  getName(string64) {

    body = {
      "requests": [
        {
          "image": {
            "content": string64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    };
    
    this.GetNumberOfWordsInTitle().subscribe(data => {
      //Reset names + number check for space
      nameCard = "";
      this.nameOfCard = [];
      oldNr = 0;

      var numberOfWordsInTitle = data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words.length

      for (var i = 0; i < numberOfWordsInTitle; i++) {
        //add spacing between two words
        if (oldNr != i) {
          oldNr = i;
          this.nameOfCard.push(" ");
        }

        var numberOfSymbols = data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[i].symbols.length;

        for (var j = 0; j < numberOfSymbols; j++) {
          this.nameOfCard.push(data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[i].symbols[j].text);

        }
      }
      console.log(this.nameOfCard);

      for (var i = 0; i < this.nameOfCard.length; i++) {
        nameCard += this.nameOfCard[i];
      }

      console.log(nameCard);
      
      this.cardName = nameCard;

      this.dataservice.GetLocalApi('Cards')
        .subscribe(data => {
          //console.log(data);
          this.LoopData(data, this.cardName);
          this.cardList = CardList;
        });

      });

  }

  LoopData(data, name) {
    for (var i = 0; i < data.length; i++)
    {
      if (data[i].cardName == name)
      {
        console.log("same name");
        CardList.push(data[i]);
      }
      else {
        console.log("card not found");
      }
    }
  }

  GetItAll() {
    this.GetNumberOfWordsInTitle().subscribe((data) => {
      //Reset names + number check for space
      nameCard = "";
      this.nameOfCard = [];
      oldNr = 0;

      var numberOfWordsInTitle = data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words.length

      for (var i = 0; i < numberOfWordsInTitle; i++) {
        //add spacing between two words
        if (oldNr != i) {
          oldNr = i;
          this.nameOfCard.push(" ");
        }

        var numberOfSymbols = data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[i].symbols.length;

        for (var j = 0; j < numberOfSymbols; j++) {
          this.nameOfCard.push(data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[i].symbols[j].text);

        }
      }
      console.log(this.nameOfCard);

      for (var i = 0; i < this.nameOfCard.length; i++) {
        nameCard += this.nameOfCard[i];
      }

      console.log(nameCard);

      var sendName = nameCard;

      return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + sendName)
        .map((response) => response.json()).subscribe((data) =>
        {
          console.log(nameCard);
          console.log(data);

          this.GetInfoCard().subscribe((data) => {
            console.log(data.cards[0]);
            this.cardName = data.cards[0].name;
            this.cardSet = data.cards[0].set;
          });
        }
        );
      
      }
    );

    
  }

  GetNumberOfWordsInTitle() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZeN4I1k3t34D94p_Jv2bdTKGLsuYbXx4', body, { headers: headers })
      .map((response) => response.json());    
  }

  getPath(link) {

    if (url == this.file) {
      console.log("same link");
    }
    else {
      url = this.file;
      if (url.includes("http")) {
        console.log("http found, using HTTP POST");

        body = {
          "requests": [
            {
              "image": {
                "source": {
                  "imageUri": url
                  //"content": ""
                }
              },
              "features": [
                {
                  "type": "DOCUMENT_TEXT_DETECTION"
                }
              ]
            }
          ]
        };

        this.GetItAll();
      }
      else {
        console.log("name of card found, using HTTP GET")

        return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + url)
          .map((response) => response.json())
          .subscribe((data) => {
            console.log(data.cards[0]);
              this.cardName = data.cards[0].name;
              this.cardSet = data.cards[0].set;
            });
      }

    }
  }

  GetInfoCard() {
    console.log(nameCard);

    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + nameCard)
      .map((response) => response.json());
  }

  goToDetails() {

    localStorage.setItem('searchName', this.cardName);
    localStorage.setItem('searchSet', this.cardSet);
    this.router.navigate(["details"]);
  }

}
