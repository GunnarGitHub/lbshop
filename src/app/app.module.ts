import { firebaseConfig } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ListShopsComponent } from './items/list-shops/list-shops.component';
import { DatabaseService, SearchService } from './common/services';
import { ListItemsComponent } from './items/list-items/list-items.component';
import { ListDepartmentsWithItemsComponent } from './items/list-departments-with-items/list-departments-with-items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ListDepartmentComponent } from './items/list-department/list-department.component';
import { SearchComponent } from './search/search.component';
import { ItemsHomeComponent } from './items/items-home/items-home.component';
import { ItemDropZoneComponent } from './items/item-drop-zone/item-drop-zone.component'
import { DepartmentsHomeComponent } from './departments/departments-home/departments-home.component'
import { DepartmentDropZoneComponent } from './departments/department-drop-zone/department-drop-zone.component'
import { ShowShopsWithDepartmentsComponent } from './departments/show-shops-with-departments/show-shops-with-departments.component'
import { ShowShopsComponent } from './departments/show-shops/show-shops.component';
import { ShowShopComponent } from './departments/show-shop/show-shop.component'
import { ShowDepartmentsComponent } from './departments/show-departments/show-departments.component'
import { ShowDepartmentComponent } from './departments/show-department/show-department.component'
//import { ListShopsWithDepartmentsComponent } from './departments/list-shops-with-departments/list-shops-with-departments.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'LB SHOP' }},
  { path: 'home', component: ItemsHomeComponent },
  { path: 'departments', component: DepartmentsHomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({ 
  declarations: [
    AppComponent,
    ListShopsComponent,
    ListDepartmentComponent,
    ListItemsComponent,
    ListDepartmentsWithItemsComponent,
    EditItemComponent,
    ListDepartmentComponent,
    SearchComponent,
    PageNotFoundComponent,
    ItemsHomeComponent,
    DepartmentsHomeComponent,
    DepartmentDropZoneComponent,
    ItemDropZoneComponent,
    ShowShopsComponent,
    ShowShopComponent,
    ShowDepartmentsComponent,
    ShowDepartmentComponent,
    ShowShopsWithDepartmentsComponent
    //ListShopsWithDepartmentsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
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
