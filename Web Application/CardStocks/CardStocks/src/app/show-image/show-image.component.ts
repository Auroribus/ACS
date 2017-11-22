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

  imgSrc: string = "assets/Loading.png";

  ngOnInit() {
    this.dataservice.GetLocalApi('Cards/' + this.dataservice.hoverItem)
      .subscribe(data => {
        console.log(data);
      });
  }

}
