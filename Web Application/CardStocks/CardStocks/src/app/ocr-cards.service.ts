import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './data.service';

let url;
let body = {}
let nameCard = "";
let pathLink;
let oldNr = 0;
var CardList = [];
var files;

@Injectable()
export class OcrCardsService {
    
  constructor(private http: Http, private dataservice: DataService) {
    
  }
  
  base64String: string;
  feedback_upload: string;

  nameOfCard: string[];

  file: string = "";
  cardName: string = "card name";
  cardSet: string = "--";
  cardCondition: string = "--";

  imageSrc: string = "assets/LoadingGif4.gif";
  cardList: string[];

  cardNameLoaded: boolean = false;
  multiple_Files: boolean = false;

  array_index: number = 0;

  Get_nextFile() {

    var file = files[this.array_index];

    if (files && file) {
      var reader = new FileReader();
      var r2 = new FileReader();

      r2.onload = (e: any) => {
        this.imageSrc = e.target.result;
      }

      r2.readAsDataURL(files[this.array_index]);

      reader.onload = this.file_Loaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  //without OCR
  selectFile_withoutOCR(evt) {
    files = evt.target.files;
    var file = files[this.array_index];

    console.log(files);

    if (files.length > 1) {
      this.multiple_Files = true;
    }

    if (files && file) {
      var reader = new FileReader();
      var r2 = new FileReader();

      r2.onload = (e: any) => {
        this.imageSrc = e.target.result;
      }

      r2.readAsDataURL(files[this.array_index]);

      reader.onload = this.file_Loaded_withoutOCR.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  file_Loaded_withoutOCR(evt) {

    var binaryString = evt.target.result;
    this.base64String = btoa(binaryString);
    this.cardNameLoaded = true;
  }

  //With OCR
  selectFile(evt) {

    files = evt.target.files;
    var file = files[this.array_index];

    console.log(files);
    
    if (files.length > 1)
    {
      this.multiple_Files = true;
    }

    if (files && file) {
      var reader = new FileReader();
      var r2 = new FileReader();

      r2.onload = (e: any) => {
        this.imageSrc = e.target.result;
      }

      r2.readAsDataURL(files[this.array_index]);

      reader.onload = this.file_Loaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  file_Loaded(evt) {

    var binaryString = evt.target.result;
    this.base64String = btoa(binaryString);
    //console.log(btoa(binaryString));

    this.getName_fromFile(this.base64String);
  }

  getName_fromFile(base64string) {
    body = {
      "requests": [
        {
          "image": {
            "content": base64string
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    };

    this.POST_Image().subscribe(data => {
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
      //console.log(this.nameOfCard);

      for (var i = 0; i < this.nameOfCard.length; i++) {
        nameCard += this.nameOfCard[i];
      }

      //console.log(nameCard);

      this.cardName = nameCard;
      //remove any numbers from the card name to prevent errors
      this.cardName = this.cardName.replace(/[0-9]/g, '');

      this.cardNameLoaded = true;

      this.ADD_ToRemoveTable();

    });
  }

  POST_Image() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZeN4I1k3t34D94p_Jv2bdTKGLsuYbXx4', body, { headers: headers })
      .map((response) => response.json());
  }

  GET_CardFromAPI(cardname) {
    //console.log(nameCard);

    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + cardname)
      .map((response) => response.json());
  }

  POST_CardToACC() {

    body = {
      AccConnectionString: "pi",
      ImageBase64String: this.base64String
    }
    
    this.dataservice.PostLocalApi('Acc', body).subscribe(data => {
      
      if (this.multiple_Files) {
        this.array_index += 1;

        if (this.array_index >= files.length) {
          this.dataservice.setFeedbackTextColor("red");
          this.feedback_upload = "No More Cards";
          location.reload();
        }
        else {
          this.dataservice.setFeedbackTextColor("green");
          this.feedback_upload = "Succesfully Added Card, loading Next Image";

          this.Get_nextFile();
        }
      }
      else if (!this.multiple_Files) {
        this.dataservice.setFeedbackTextColor("green");
        this.feedback_upload = "Succesfully Added Card";

        location.reload();
      }
    });
  }
  
  POST_CardToDB() {

    this.feedback_upload = "";

    console.log("posting to db");

    var id = localStorage.getItem('id');
    
    body = {
      cardName: this.cardName,
      cardSet: this.cardSet,
      cardCondition: this.cardCondition,
      userId: id,
      imgBase64: "data:image/png;base64," + this.base64String
    }

    //Cards
    this.dataservice.PostLocalApi('Cards', body).subscribe(data => {
      
      if (this.multiple_Files)
      {
        this.array_index += 1;

        if (this.array_index >= files.length)
        {
          this.dataservice.setFeedbackTextColor("red");
          this.feedback_upload = "No More Cards";
          location.reload();
        }
        else {
          this.dataservice.setFeedbackTextColor("green");
          this.feedback_upload = "Succesfully Added Card, loading Next Image";

          this.Get_nextFile();
        }        
      }
      else if (!this.multiple_Files)
      {
        this.dataservice.setFeedbackTextColor("green");
        this.feedback_upload = "Succesfully Added Card";

        location.reload();
      }
    });
  }

  ADD_ToRemoveTable() {
    this.cardList = [];
    CardList = [];

    this.dataservice.GetLocalApi('Cards')
      .subscribe(data => {
        //console.log(data);

        var id = localStorage.getItem('id');

        this.Search_Card(data, this.cardName, id);

        this.cardList = CardList;
      });
  }

  Search_Card(data, name, userId) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].cardName == name && data[i].userId == userId) {
        //console.log("same name");
        CardList.push(data[i]);
      }
      else {
        //console.log("card not found");
      }
    }
  }

  DEL_fromDB(cardId) {
    this.http.delete('/api/Cards/' + cardId).map(res => res.json()).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }


  POST_Base64(string64) {

    console.log(string64);

    let body = {
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
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZeN4I1k3t34D94p_Jv2bdTKGLsuYbXx4', body, { headers: headers })
        .map((response) => response.json())
        .subscribe(data => {

          console.log(data);

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
          //console.log(this.nameOfCard);

          for (var i = 0; i < this.nameOfCard.length; i++) {
            nameCard += this.nameOfCard[i];
          }

          //console.log(nameCard);

          this.cardName = nameCard;
          //remove any numbers from the card name to prevent errors
          this.cardName = this.cardName.replace(/[0-9]/g, '');

          this.cardNameLoaded = true;
          
    });        
  }

}
