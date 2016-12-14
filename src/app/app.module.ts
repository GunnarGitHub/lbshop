import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user';
import { ListShopsComponent } from './list-shops/list-shops.component';
import { ShopsService, DepartmentsService, ItemsService, DatabaseService, SearchService } from './services';
import { ListDepartmentsComponent } from './list-departments/list-departments.component'
import { OrderByPipe } from './pipes';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListDepartementsWithItemsComponent } from './list-departements-with-items/list-departements-with-items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { SearchComponent } from './search/search.component';

// firebase OnInit
export const firebaseConfig = {
  apiKey: "AIzaSyDo1_LTrFIec_OtXL0DVEyKb7xWK8xUDHQ",
  authDomain: "lb-shop-83664.firebaseapp.com",
  databaseURL: "https://lb-shop-83664.firebaseio.com",
  storageBucket: "lb-shop-83664.appspot.com",
  messagingSenderId: "176056224462"
};



@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    UserComponent,
    ListShopsComponent,
    ListDepartmentComponent,
    ListDepartmentsComponent,
    ListItemsComponent,
    ListDepartementsWithItemsComponent,
    OrderByPipe,
    EditItemComponent,
    OrderByPipe,
    ListDepartmentComponent,
    SearchComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    ShopsService,
    DepartmentsService,
    ItemsService,
    DatabaseService,
    SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
