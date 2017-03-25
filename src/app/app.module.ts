import { firebaseConfig } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user';
import { ListShopsComponent } from './items/list-shops/list-shops.component';
import { DatabaseService, SearchService } from './common/services';
import { ListItemsComponent } from './items/list-items/list-items.component';
import { ListDepartementsWithItemsComponent } from './items/list-departements-with-items/list-departements-with-items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ListDepartmentComponent } from './items/list-department/list-department.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './items/home/home.component';
import { ListShopsWithDepartmentsComponent } from './departments/list-shops-with-departments/list-shops-with-departments.component'
import { ItemDropZoneComponent } from './items/item-drop-zone/item-drop-zone.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'LB SHOP' }},
  { path: 'home', component: HomeComponent },
  { path: 'departments', component: ListShopsWithDepartmentsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({ 
  declarations: [
    AppComponent,
    ShopComponent,
    UserComponent,
    ListShopsComponent,
    ListDepartmentComponent,
    ListItemsComponent,
    ListDepartementsWithItemsComponent,
    EditItemComponent,
    ListDepartmentComponent,
    SearchComponent,
    PageNotFoundComponent,
    HomeComponent,
    ListShopsWithDepartmentsComponent,
    ItemDropZoneComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  entryComponents: [],
  providers: [
    DatabaseService,
    SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
