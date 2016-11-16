import { Action } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { MaterialModule }  from '@angular/material';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user';
import { ListShopsComponent } from './list-shops/list-shops.component';
import { ShopsService, DepartmentsService, ItemsService, DatabaseService } from './services';
import { ListDepartmentsComponent } from './list-departments/list-departments.component'
//import { StoreContainer } from './shared/store.container';
import { user, shop, shops, departments, items } from './reducers';
import { ShopsPipe, DepartmentsPipe, ItemsPipe, OrderByPipe } from './pipes';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListDepartementsWithItemsComponent } from './list-departements-with-items/list-departements-with-items.component';
import { EditItemComponent } from './edit-item/edit-item.component';

const initialState: any = {
  user: {},
  shop: {},
  shops: [],
  departments: [ ],
  items: []
};

const rootReducer: any = combineReducers({
  user,
  shop,
  shops,
  departments,
  items
});

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    UserComponent,
    ListShopsComponent,
    ListDepartmentsComponent,
    ShopsPipe,
    ListItemsComponent,
    ListDepartementsWithItemsComponent,
    ItemsPipe,
    DepartmentsPipe,
    OrderByPipe,
    EditItemComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer, initialState),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    MaterialModule.forRoot()
  ],
  providers: [ShopsService, DepartmentsService, ItemsService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
