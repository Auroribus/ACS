import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  username: string;

  constructor(private router: Router, private route: ActivatedRoute, private dataservice : DataService) { }

  ngOnInit() {
      this.username = localStorage.getItem('user');
      if (this.username == null || this.username == "" || this.username == "Login") {
        this.router.navigate([""]);
      }
    
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

}
