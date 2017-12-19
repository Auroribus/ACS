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
    this.dataservice.GetLocalApi('Membership').subscribe(data => console.log(data));
    this.dataservice.GetLocalApi('User').subscribe(data => console.log(data));
  }

  closeMenu() {
    this.dataservice.slideInOutLeftRight = "out";
    this.dataservice.slideInOutUpDown = "out";
  }

  upgradeTo(name) {
    console.log(name);

    var id = localStorage.getItem('id');

    let body = {
      membershipId: id,
      userId: id,
      memberStatus: name
    }

    console.log(body);

    this.dataservice.PutLocalApi('Membership/' + id, body).subscribe(data => {
      location.reload();
    });

    
  }

}
