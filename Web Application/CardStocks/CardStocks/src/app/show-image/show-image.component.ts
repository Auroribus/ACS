import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  imgSrc: string = "assets/NoImageFound.png";

  ngOnInit() {
    
    this.dataservice.GetExternalApi('https://api.magicthegathering.io/v1/cards?name=Lotus Petal')
      .subscribe(data => {
        console.log(data.cards[0]);
        this.imgSrc = data.cards[0].imageUrl;
      });
    
  }

}
