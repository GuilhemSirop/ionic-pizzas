import { Injectable } from '@angular/core';
import { PizzaBasket } from '../../models/pizza-basket';

import 'rxjs/add/operator/map';

@Injectable()
export class BasketProvider {

  constructor() {

  }


  get(){
    let pizzas = JSON.parse(localStorage.getItem('pizzas'));
    console.log(pizzas);
    return pizzas ? pizzas : [];
  }

  create(pizza: PizzaBasket){
    let pizzas:any = this.get();
    let update = false;
    let index;

    for(const i in pizzas){
      // Si la pizza existe déjà dans le panier
      if(pizzas[i]._id === pizza._id){
        update = true;
        index = i;
      }
    }
    if(update){
      pizzas[index].nb = pizzas[index].nb + 1;
    } else {
      pizza.nb = 1;
      pizzas.unshift(pizza);
    }
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    return pizzas;
  }


  updateNb(pizza: PizzaBasket){
    let pizzas:any = this.get();

    for(const i in pizzas){
      // Si la pizza existe déjà dans le panier
      if(pizzas[i]._id === pizza._id){
        if(pizzas[i].nb > 1){
          pizzas[i].nb = pizzas[i].nb - 1;
        } else {
          pizzas.splice(i, 1);
        }

      }
    }

    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    return pizzas;
  }

  deleteById(id){
    let pizzas = this.get();
    pizzas = pizzas.filter(aPizza => aPizza._id !== id);
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    return pizzas;
  }



}
