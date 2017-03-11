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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user';
import { ListShopsComponent } from './home/list-shops/list-shops.component';
import { DatabaseService, SearchService } from './services';
import { OrderByPipe } from './pipes';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListDepartementsWithItemsComponent } from './list-departements-with-items/list-departements-with-items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home-comp/home.component';
import { ItemDropZoneComponent } from './item-drop-zone/item-drop-zone.component'

const routes: Routes = [
 // { path: 'crisis-center', component: CrisisListComponent },
 // { path: 'hero/:id',      component: HeroDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'LB SHOP' }},
  { path: 'home', component: HomeComponent },
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
    OrderByPipe,
    EditItemComponent,
    OrderByPipe,
    ListDepartmentComponent,
    SearchComponent,
    PageNotFoundComponent,
    HomeComponent,
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
