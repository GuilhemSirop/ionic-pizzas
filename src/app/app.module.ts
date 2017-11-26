import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { MyApp } from './app.component';

import { PizzaProvider } from '../providers/pizza/pizza';
import { PizzaListPage } from '../pages/pizza-list/pizza-list';
import { PizzaDetailPage } from '../pages/pizza-detail/pizza-detail';
import { AdministrationPage } from '../pages/administration/administration';
import { PizzaFormPage } from '../pages/pizza-form/pizza-form';

import { HttpClientModule } from '@angular/common/http';
import {IngredientListPage} from '../pages/ingredient-list/ingredient-list';
import {IngredientFormPage} from '../pages/ingredient-form/ingredient-form';
import {IngredientDetailPage} from '../pages/ingredient-detail/ingredient-detail';
import {BasketProvider} from '../providers/basket/basket';
import {BasketPage} from '../pages/basket/basket';

@NgModule({
  declarations: [
    MyApp,
    AdministrationPage,
    PizzaListPage,
    PizzaFormPage,
    PizzaDetailPage,
    IngredientListPage,
    IngredientFormPage,
    IngredientDetailPage,
    BasketPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdministrationPage,
    PizzaFormPage,
    PizzaListPage,
    PizzaDetailPage,
    IngredientListPage,
    IngredientFormPage,
    IngredientDetailPage,
    BasketPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaProvider
  ]
})
export class AppModule {}
