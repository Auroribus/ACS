import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';


//let url = "https://www.picclickimg.com/d/l400/pict/152663272756_/Magic-the-gathering-Lotus-Petal-Tempest.jpg";
//let url = "https://vignette.wikia.nocookie.net/mtg/images/7/7a/Scoria_Elemental.jpg/revision/latest?cb=20110511020909";
let url;
let TestString;

let body = {}

let numberOfWordsInTitle;
let numberOfSymbols;
let nameCard = "";

let oldNr = 0;

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  nameOfCard: string[];

  file: string = "";
  cardName: string = "card name";

  constructor(private http: Http) {
    this.nameOfCard = [];
  }

  ngOnInit() {
    
    
  }

  GetItAll() {
    this.GetNumberOfWordsInTitle().subscribe((data) => {


      numberOfWordsInTitle = data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words.length

      for (var i = 0; i < numberOfWordsInTitle; i++) {
        //add spacing between two words
        if (oldNr != i) {
          oldNr = i;
          this.nameOfCard.push(" ");
        }

        numberOfSymbols = data.responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[i].symbols.length;

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
    console.log(this.file);
    
      url = this.file;

      body = {
        "requests": [
          {
            "image": {
              "source": {
                "imageUri":
                //"content":
                url

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

}
