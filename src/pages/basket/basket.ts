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
  basketPrice: number;
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

  getBasketPrice(){
    let price = 0;
    for(let i in this.listPizza){
      price += +this.listPizza[i].price * this.listPizza[i].nb;
    }
    return price;
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
