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
      
    ngOnInit() {
        
    }

    
}
