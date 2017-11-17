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
  cardImage: string = "assets/NoImageFound.png";
  cardText: string = "card text";

  cardPrice: number;

  rulings: string[] = [];

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  ngOnInit() {
    this.cardPrice = 1.03;

    this.route.queryParams
      .subscribe(params => {
        //console.log(params);

        if ((params.name == null || params.name == "") && (params.set != null || params.set != ""))
        {
          //console.log("name empty, set not empty");
          url = 'https://api.magicthegathering.io/v1/cards?setName=' + params.set;
        }
        else if ((params.name != null || params.name == "") && (params.set == null || params.set == ""))
        {
          //console.log("name not empty, set empty");
          url = 'https://api.magicthegathering.io/v1/cards?name=' + params.name;
        }
        else if (params.name != null && params.name != "" && params.set != null && params.set != "")
        {
          //console.log("name not empty, set not empty");
          url = 'https://api.magicthegathering.io/v1/cards?name=' + params.name + '&setName=' + params.set;
        }
       
        if (url != null || url != "") {
          this.GetMTGioAPI();
        }
        else
        {
          console.log("url empty");
        }
    });       
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
