import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';

var GetACSdataFromDB;

@Component({
  selector: 'app-acc-device',
  templateUrl: './acc-device.component.html',
  styleUrls: ['./acc-device.component.css']
})
export class AccDeviceComponent implements OnInit {

  cards: string[] = [];

  device_string: string;
  connected: boolean;
  started: boolean;
  image_src: string = "assets/LoadingGif4.gif";

  cardName: string = "Ajani Steadfast";
  cardSet: string = "Magic 2015";

  constructor(private dataservice: DataService, private router: Router) { }

  ngOnInit() {
    var id = localStorage.getItem('id');

    if (id == null)
    {
      this.router.navigate([""]);
    }
    else {

      this.dataservice.GetLocalApi('User/' + id).subscribe(data => {
        if (data.accConnectionString == null || data.accConnectionString == "")
        {
          console.log("empty connection string, no device found");
          this.device_string = "No Device was Found";
        }
        else
        {
          this.device_string = data.accConnectionString;
          
        }
      });
      
    }
  }

  ngOnDestroy() {
    Observable.interval()
  }

  connectWithDevice() {
    this.connected = true;
  }

  return() {
    this.connected = false;
  }

  index_array: number = 0;
  feedback_start: string;

  start() {

    this.dataservice.setFeedbackTextColor("green");
    this.feedback_start = "Starting...";

    this.started = true;
    this.cards = [];

    GetACSdataFromDB = Observable.interval(1000 * 2).subscribe(x => {

      this.feedback_start = "";
      
      this.dataservice.GetLocalApi('Cards').subscribe(data => {

        var array_size = data.length;

        console.log("index: " + this.index_array);

        this.cards.push(data[this.index_array]);
        this.image_src = data[this.index_array].imgBase64;
        
        this.index_array += 1;

        if (this.index_array > (array_size - 1))
        {
          console.log("end of array");
          GetACSdataFromDB.unsubscribe();
        }
      })
    });
  }

  stop() {
    GetACSdataFromDB.unsubscribe();
    this.index_array = 0;
    this.dataservice.setFeedbackTextColor("red");
    this.feedback_start = "Stopping...";
    this.started = false;
  }
}
