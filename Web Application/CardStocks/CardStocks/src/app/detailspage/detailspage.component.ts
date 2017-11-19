import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


let url;

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.css']
})
export class DetailspageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http, private dataservice: DataService) { }

  cardName: string = "card name";
  cardSet: string = "card set";
  cardSets: string[] = [];
  cardRarity: string = "card rarity";
  cardType: string = "card type";
  cardImage: string = "assets/Loading.png";
  cardText: string = "card text";

  cardPrice: number;

  rulings: string[] = [];

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
    this.cardPrice = 1.03;

    this.GetUrl();
    
    if (url != null && url != "") {
      this.GetMTGioAPI();
    }
    else {
      console.log("url empty");
    }
    
  }


  GetUrl() {
    console.log(localStorage.getItem('searchName'));
    console.log(localStorage.getItem('searchSet'));

    var sName = localStorage.getItem('searchName');
    var sSet = localStorage.getItem('searchSet');

    if (sName != null && sName != "" && sSet != null && sSet != "")
    {
      //find by name and set
      this.GetCardByNameAndSet();
    }
    else if (sName != null && sName != "")
    {
      //find by name
      this.GetCardByName();
    }
    else if (sSet != null && sSet != "")
    {
      //find by set
      console.log("find by set only");
    }
  }

  GetCardByName() {
    url = 'https://api.magicthegathering.io/v1/cards?name=' + localStorage.getItem('searchName');
  }

  GetCardsInSet() {
    //url = 'https://api.magicthegathering.io/v1/cards?setName=' + this.dataservice.searchCardSet;
  }

  GetCardByNameAndSet() {
    url = 'https://api.magicthegathering.io/v1/cards?name=' + localStorage.getItem('searchName') + '&setName=' + localStorage.getItem('searchSet');
  }

  GetMTGioAPI() {
    this.dataservice.GetExternalApi(url)
      .subscribe((data) => {
        console.log(data.cards[0]);
        this.cardName = data.cards[0].name;
        this.cardSet = data.cards[0].setName;
        this.cardRarity = data.cards[0].rarity;
        this.cardType = data.cards[0].types[0];
        this.cardText = data.cards[0].text;
        this.cardSets = data.cards[0].printings;

        if (data.cards[0].rulings == null) {
          //console.log("no rulings found");
          this.rulings = null;
        }
        else {
          this.rulings = data.cards[0].rulings;
        }

        if (data.cards[0].imageUrl != null) {
          this.cardImage = data.cards[0].imageUrl;
        }
        else {
          this.cardImage = "assets/NoImageFound.png";
        }
      });
  }

  GoToOtherSet(itemName) {
    console.log(itemName);

    url = 'https://api.magicthegathering.io/v1/cards?name=' + this.cardName + '&set=' + itemName;


    this.GetMTGioAPI();
  }
}

