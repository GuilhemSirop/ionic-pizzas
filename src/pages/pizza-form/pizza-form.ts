import {Component} from '@angular/core';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {NavController, NavParams, ToastController } from 'ionic-angular';
import {Pizza} from '../../models/pizza';
import {PizzaProvider} from '../../providers/pizza/pizza';
import {IngredientProvider} from '../../providers/ingredient/ingredient';
import {ingredientToArrayIds} from '../../models/pizza';
import {PizzaListPage} from '../pizza-list/pizza-list';


@Component({
  selector: 'page-pizza-form',
  templateUrl: 'pizza-form.html',
  providers: [PizzaProvider, IngredientProvider]
})
export class PizzaFormPage {

  pizza: Pizza;
  isLoading = false;
  title_form: string;

  listIngredient: any;
  selectedIngredients: any;

  base64textString: string;

  updateMode: boolean;

  private form: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private pizzaProvider: PizzaProvider,
              private ingredientProvider: IngredientProvider) {

    this.updateMode = this.navParams.data.update ? this.navParams.data.update : false;
    if (this.updateMode) {
      this.pizza = this.navParams.data.pizza;
    } else {
      this.resetForm();
    }

  }

  resetForm(){
    this.pizza = {
      _id: '',
      name: '',
      description: '',
      price: 0,
      img: '',
      ingredients: []
    };
    this.selectedIngredients = [];
  }


  ionViewDidLoad() {

    // ON charge la liste des INGREDIENTS
    this.ingredientProvider.get().subscribe(
      data => {
        this.listIngredient = data;
      },
      () => {
        this.listIngredient = [];
      }
    );

    // SI ON AJOUTE
    if (!this.updateMode) {
      this.title_form = 'Ajouter';
    } else {
      this.title_form = 'Modifier';
    }

    this.selectedIngredients = ingredientToArrayIds(this.pizza.ingredients);
    this.base64textString = this.pizza.img;
    // On initialise le form
    this.form = new FormGroup({
      img: new FormControl(this.base64textString),
      name: new FormControl(this.pizza.name, Validators.required),
      description: new FormControl(this.pizza.description, Validators.required),
      price: new FormControl(this.pizza.price, Validators.required),
      ingredients: new FormControl(this.selectedIngredients)
    });


  }


  /* *** Evenement onChange Image Pizza *** */
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.pizza.img = this.base64textString;
    this.form.patchValue({img: this.base64textString});
  }

  onSubmit() {
    this.isLoading = true;
    // SI ON AJOUTE
    if (!this.updateMode) {
      this.form.value.img = this.base64textString;
      this.pizzaProvider.create(this.form.value).subscribe(
        () => {
          // J'ai retiré le toast ici puisqu'il sera reçu par le socket
          this.navCtrl.setRoot(PizzaListPage, {admin:true}, {animate: true, direction: 'foward'});
        },
        () => console.error(`Un problème est survenu lors de l'ajout de la pizza.`),

        () => this.isLoading = false
      );
    } else {
      // SI ON UPDATE
      console.log(this.pizza._id);
      this.pizzaProvider.update(this.pizza._id, this.form.value).subscribe(
        (pizza) => {
          // J'ai retieré le toast ici puisqu'il sera reçu par le socket
          this.navCtrl.setRoot(PizzaListPage, {admin:true}, {animate: true, direction: 'foward'});
        },
        () => console.log(`Un problème est survenu lors de a mise à jour de la pizza.`, 'Oups !'),
        () => this.isLoading = false
      );
    }

  }

  toggleIngredient(id) {
    const index = this.selectedIngredients.indexOf(id);
    if (index !== -1) {
      this.selectedIngredients.splice(index, 1);
    } else {
      this.selectedIngredients.push(id);
    }
    console.log(this.selectedIngredients);
  }

}
