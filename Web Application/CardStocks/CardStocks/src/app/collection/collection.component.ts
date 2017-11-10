import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

let body;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http) { }

  collectionName: string;
  
  collections: string[] = [];

  ngOnInit() {
    this.http.get('/api/Collections')
      .map(res => res.json())
      .subscribe(data => {
        this.collections = data;
        console.log(this.collections);
      });
  }

  addCollection() {
    if (this.collectionName == null || this.collectionName == "" || this.collectionName.length < 5)
    {
     
      console.log("do not send");
    }
    else
    {
        this.newCollection();
    }
  }

  newCollection()
  {
    body = {
      CollectionNumber: 1.007,
      CollectionName: this.collectionName,
      UserID: 2
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/Collections', body, { headers: headers })
      .map((response) => response.json())
      .subscribe(data => {
        console.log(data);
      });
  }

}
