import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-membership-page',
  templateUrl: './membership-page.component.html',
  styleUrls: ['./membership-page.component.css']
})
export class MembershipPageComponent implements OnInit {

  constructor(private dataservice : DataService) { }

  ngOnInit() {
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

}
