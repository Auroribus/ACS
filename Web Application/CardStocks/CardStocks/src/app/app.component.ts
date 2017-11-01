import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@Component({
    selector: 'app-root',
    templateUrl: '../Views/app.component.html',
    styleUrls: ['../CSS/app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private _httpService: Http) { }
    
    apiValues: string[] = [];
    ngOnInit() {
        this._httpService.get('/api/values').subscribe(values => {
            this.apiValues = values.json() as string[];
        });
    }

    search(searchItem) {
        console.log(searchItem)
    }

    GoToHome() {
        console.log("Go To Home");
    }

    GoToAccount() {
        console.log("Go To Account");
    }

    GoToLogin()
    {
        console.log("Go To Login");
    }

    GoToShoppingCart() {
        console.log("Go To Shopping Cart");
    }

    GoToBuy() {
        console.log("Go To Buy");
    }

    GoToSell() {
        console.log("Go To Sell");
    }

    GoToCollection() {
        console.log("Go To Collection");
    }

    GoToWishList() {
        console.log("Go To Wishlist");
    }

    GoToUpload() {
        console.log("Go To Upload");
    }
}
