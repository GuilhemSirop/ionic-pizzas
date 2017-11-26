import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams, ToastController} from 'ionic-angular';
import { BasketProvider } from '../../providers/basket/basket';
import { Pizza } from '../../models/pizza';
import { PizzaBasket } from '../../models/pizza-basket';
import { PizzaDetailPage } from "../pizza-detail/pizza-detail";

@Component({
  selector: 'page-pizza-list',
  templateUrl: 'basket.html',
  providers: [BasketProvider]
})
export class BasketPage {

  listPizza: PizzaBasket[];
  pizzaDetailPage: typeof PizzaDetailPage;
  connection;


  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              private basketProvider: BasketProvider) {

    this.pizzaDetailPage = PizzaDetailPage;
    // Récupération des Pizzas
    this.listPizza = this.basketProvider.get();
  }

  ionViewDidLoad() {


  }

  lessNb(pizza: PizzaBasket) {
    this.listPizza = this.basketProvider.updateNb(pizza);
  }

  plusNb(pizza: PizzaBasket) {
    this.listPizza = this.basketProvider.create(pizza);
  }

  deletePizza(id) {
    this.listPizza = this.basketProvider.deleteById(id);
  }
  /***************************************/
  /* *** ACTION CLIQUE SUR UNE IMAGE *** */
  /***************************************/
  presentActionSheet(pizza: PizzaBasket) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Action sur la Pizza`,
      buttons: [
        {
          // ACTION ENREGISTRER
          text: 'Voir',
          icon: 'ios-eye',
          handler: () => {
            this.navCtrl.push(PizzaDetailPage, pizza);
          }
        },
        {
          // ACTION SUPPRIMER
          text: 'Supprimer',
          icon: 'ios-trash',
          role: 'destructive',
          handler: () => {
            this.deletePizza(pizza._id);
          }
        },
        {
          // ACTION QUITTER
          text: 'Annuler',
          icon: 'ios-close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }

}
