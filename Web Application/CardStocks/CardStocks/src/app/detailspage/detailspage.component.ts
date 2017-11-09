import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.css']
})
export class DetailspageComponent implements OnInit {

  constructor(private route : ActivatedRoute, private http : Http) { }

  cardName: string = "card name";
  cardSet: string = "card set";
  cardRarity: string = "card rarity";
  cardType: string = "card type";
  cardImage: string = "assets/NoImageFound.png";
  cardText: string = "card text";

  rulings: string[] = [];

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);

      return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + fragment)
        .map((response) => response.json())
        .catch((err) => {
          return Observable.throw(err);
        })
        .subscribe((data) => {
          console.log(data.cards[0]);
          this.cardName = data.cards[0].name;
          this.cardSet = data.cards[0].setName;
          this.cardRarity = data.cards[0].rarity;
          this.cardType = data.cards[0].types[0];
          this.cardText = data.cards[0].text;
          this.rulings = data.cards[0].rulings;

          console.log(this.rulings);
          if (data.cards[0].imageUrl != null)
          {
            this.cardImage = data.cards[0].imageUrl;
          }
          else
          {
            this.cardImage = "assets/NoImageFound.png";
          }
          
        });
    });
  }

}
