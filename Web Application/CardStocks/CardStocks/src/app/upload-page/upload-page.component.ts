import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { OcrCardsService } from '../ocr-cards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  
  options: boolean = true;
  Remove: boolean = false;
  Add: boolean = false;

  username: string;
  
  constructor(private http: Http, private dataservice: DataService, private router: Router, private ocr: OcrCardsService) {

  }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    if (this.username == null || this.username == "" || this.username == "Login") {
      this.router.navigate([""]);
    }
  }

  addToDB() {
    this.options = false;
    this.Add = true;
    this.Remove = false;
    this.ocr.cardNameLoaded = false;
  }

  removeFromDB() {
    this.options = false;
    this.Remove = true;
    this.Add = false;
    this.ocr.cardNameLoaded = false;
  }
  

  Options() {
    this.options = true;
    this.Remove = false;
    this.Add = false;
  }
  
  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

}
