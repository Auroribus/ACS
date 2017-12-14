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

  upgradeTo(name) {
    console.log(name);

    var id = localStorage.getItem('id');

    this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
      let body = {
        userId: data.userId,
        username: data.username,
        email: data.email,
        password: data.password,
        amountOfSales: data.amountOfSales,
        rating: data.rating,
        dateOfCreation: data.dateOfCreation,
        storeCredit: data.storeCredit,        
        membership: name
      };

      this.dataservice.PutLocalApi('User/' + id, body).subscribe(data => {
        location.reload();
      });
    });

    
  }

}
