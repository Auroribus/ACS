import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: '../Views/app.component.html',
    styleUrls: ['../CSS/app.component.css'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(-100%, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ]
})

export class AppComponent implements OnInit {
    constructor(private _httpService: Http) { }

    menuState: string = 'out';

    toggleMenu() {
        // 1-line if statement that toggles the value:
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }

    apiValues: string[] = [];
    ngOnInit() {
        this._httpService.get('/api/values').subscribe(values => {
            this.apiValues = values.json() as string[];
        });
    }

    search(searchItem) {
        console.log(searchItem)
    }

    GoToHome() {
        console.log("Go To Home");
    }
}