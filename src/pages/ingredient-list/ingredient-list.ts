import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams, ToastController } from 'ionic-angular';
import { IngredientProvider} from '../../providers/ingredient/ingredient';
import { Ingredient } from '../../models/ingredient';
import { IngredientDetailPage } from "../ingredient-detail/ingredient-detail";
import { IngredientFormPage } from "../ingredient-form/ingredient-form";

@Component({
  selector: 'page-ingredient-list',
  templateUrl: 'ingredient-list.html',
  providers: [IngredientProvider]
})
export class IngredientListPage {

  adminMode: boolean;
  listIngredient: Ingredient[];
  ingredientDetailPage: typeof IngredientDetailPage;
  ingredientFormPage: typeof IngredientFormPage;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              private IngredientProvider: IngredientProvider) {

    this.adminMode = this.navParams.data.admin ? this.navParams.data.admin : false;
    this.ingredientDetailPage = IngredientDetailPage;
    this.ingredientFormPage = IngredientFormPage;
    // Récupération des Ingredients
    this.IngredientProvider.get().subscribe((ingredient) => {
      this.listIngredient = ingredient;
    });
  }

  ionViewDidLoad() {
  }

  deleteIngredient(id) {
    console.log(id);
    this.IngredientProvider.deleteById(id).subscribe(
      () => {
        this.listIngredient = this.listIngredient.filter(aIngredient => aIngredient._id !== id);
        this.toastCtrl.create({
          message: `L'ingrédient a été supprimée !`,
          duration: 3000,
          position: 'top'
        }).present();
      },
      () => console.log('error')
    );

  }
  /***************************************/
  /* *** ACTION CLIQUE SUR UNE IMAGE *** */
  /***************************************/
  presentActionSheet(ingredient: Ingredient) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Actions sur l'ingrédient`,
      buttons: [
        {
          // ACTION ENREGISTRER
          text: 'Voir',
          icon: 'ios-eye',
          handler: () => {
            this.navCtrl.push(IngredientDetailPage, ingredient);
          }
        },
        {
          // ACTION ENREGISTRER
          text: 'Modifier',
          icon: 'ios-cog',
          handler: () => {
            this.navCtrl.push(IngredientFormPage, {ingredient: ingredient, update: true});
          }
        },
        {
          // ACTION SUPPRIMER
          text: 'Supprimer',
          icon: 'ios-trash',
          role: 'destructive',
          handler: () => {
            this.deleteIngredient(ingredient._id);
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
