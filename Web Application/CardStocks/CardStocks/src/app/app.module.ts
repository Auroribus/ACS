import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailspageComponent } from './detailspage/detailspage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CollectionComponent } from './collection/collection.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sell', component: SellComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'shoppingcart', component: ShoppingcartComponent },
  { path: 'details', component: DetailspageComponent },
  { path: 'upload', component: UploadPageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        NavbarComponent,
        BodyComponent,
        HomepageComponent,
        DetailspageComponent,
        WishlistComponent,
        CollectionComponent,
        BuyComponent,
        SellComponent,
        ShoppingcartComponent,
        RegisterComponent,
        LoginComponent,
        UploadPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
    
export class AppModule { }
