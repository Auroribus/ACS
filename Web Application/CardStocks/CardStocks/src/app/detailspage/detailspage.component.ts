import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


let url;

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.css']
})
export class DetailspageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: Http, private dataservice: DataService) { }

  cardName: string = "card name";
  cardSet: string = "card set";
  cardSets: string[] = [];
  cardRarity: string = "card rarity";
  cardType: string = "card type";
  cardImage: string = "assets/LoadingGif3.gif";
  cardText: string = "card text";

  setname: string = "v09";

  cardPrice: number;

  rulings: string[] = [];
  sellListing: string[] = [];
  sellerList: string[] = [];
  sellerRating: string[] = [];

  showList: Boolean = false;

  angleString: string = "up";

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
    url = 'https://api.magicthegathering.io/v1/cards?name=' + localStorage.getItem('searchName') + '&set=' + localStorage.getItem('searchSet');
  }

  GetMTGioAPI() {
    this.dataservice.GetExternalApi(url)
      .subscribe((data) => {

        //reset arrays
        this.cardSets = [];

        console.log(data.cards[0]);
        this.cardName = data.cards[0].name;
        this.cardSet = data.cards[0].setName;
        this.cardRarity = data.cards[0].rarity;
        this.cardType = data.cards[0].types[0];
        this.cardText = data.cards[0].text;

        for (var i = 0; i < data.cards[0].printings.length; i++)
        {
          this.cardSets.push(data.cards[0].printings[i].toLowerCase());
        }

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
          //check if any image in database
          this.GetImageFromDB(this.cardName);
        }

        this.GetSellListings();        

      });
  }

  GetImageFromDB(cardName) {

    this.dataservice.GetLocalApi('Cards').subscribe(data => {
      for (var i = 0; i < data.length; i++)
      {
        console.log(data[i].cardName);
        console.log(cardName);
        if (data[i].cardName == cardName)
        {
          this.cardImage = data[i].imgBase64;
          break;
        }
        else {
          this.cardImage = "assets/NoImageFound.png";
        }
      }
    });

    
  }

  GetSellerName(userId) {
    this.dataservice.GetLocalApi('User/' + userId ).subscribe(data => {
      console.log(data.username);
      this.sellerList.push(data.username);
      this.sellerRating.push(data.rating);
    });
  }

  GetSellListings()
  {
    this.dataservice.GetLocalApi('SellList').subscribe(data => {
      console.log(data);

      this.sellListing = [];
      this.sellerList = [];
      this.sellerRating = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].cardName == this.cardName) {
          this.sellListing.push(data[i]);

          this.GetSellerName(data[i].userId);
        }
      }

      //if no listings were found:
      if (this.sellListing.length == 0) {
        console.log("no sell listings found");

        data[0].sellPrice = "---";

        this.sellListing.push(data[0]);
        this.sellerList.push("None Found");
        this.sellerRating.push("---");
        this.sellerList.push("Test");

        console.log(this.sellerList);
      }
    });
  }

  GoToOtherSet(itemName) {
    console.log(itemName);

    url = 'https://api.magicthegathering.io/v1/cards?name=' + this.cardName + '&set=' + itemName;


    this.GetMTGioAPI();
  }

  AddToWishlist() {
    //console.log(this.cardName);

    if (this.cardName == null || this.cardName == "") {
      console.log("No Card!");
    }
    else {
      //this.NewWishlist();
      this.NewWishCard();
    }
  }

  NewWishlist() {
    let body = {
      wishListId: 1,
      collectionId: 1,
      userID: 1
    }

    this.dataservice.PostLocalApi('WishLists', body).subscribe(data => {
      console.log(data);
      //this.router.navigate(['wishlist']);
    });
  }

  NewWishCard() {
    var id = localStorage.getItem("id");
    let body = {
      wishListId: id,
      CardName: this.cardName,
      CardSet: this.cardSet,
      //CardCondition: "NM",
      ImgUrl: this.cardImage
    }

    this.dataservice.PostLocalApi('WishCards', body).subscribe(data => {
      console.log(data);
      this.router.navigate(['wishlist']);
    });
  }

  FlipArrowIcon() {
    if (this.angleString == "up") {
      this.angleString = "down";
      this.showList = true;
    }
    else if (this.angleString == "down") {
      this.angleString = "up";
      this.showList = false;
    }
  }
}
