import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: '../Views/app.component.html',
    styleUrls: ['../CSS/app.component.css']
})

export class AppComponent implements OnInit {
  
    constructor(private http: Http) { }
      
    ngOnInit() {
      this.http.get('/api/cards')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
        });
    }

    
}
