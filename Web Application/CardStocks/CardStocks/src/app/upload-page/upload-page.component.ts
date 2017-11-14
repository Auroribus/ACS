import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

//let url = "https://www.picclickimg.com/d/l400/pict/152663272756_/Magic-the-gathering-Lotus-Petal-Tempest.jpg";
//let url = "https://vignette.wikia.nocookie.net/mtg/images/7/7a/Scoria_Elemental.jpg/revision/latest?cb=20110511020909";
let url;

let body = {}

let nameCard = "";

let pathLink;

let oldNr = 0;

let encodeImage;

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  
  nameOfCard: string[];

  file: string = "";
  cardName: string = "card name";
  cardSet: string = "card set";
  cardRarity: string = "card rarity";

  constructor(private http: Http, private dataservice: DataService) {
    
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
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
            this.cardRarity = data.cards[0].rarity;
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
              this.cardRarity = data.cards[0].rarity;
            
            
            });
      }

    }
  }

  GetInfoCard() {
    console.log(nameCard);

    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + nameCard)
      .map((response) => response.json());
  }

}
