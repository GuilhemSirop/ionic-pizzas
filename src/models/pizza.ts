import { Ingredient } from "./ingredient";

export interface Pizza {
  _id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  ingredients: Ingredient[];
}

export function ingredientToArrayIds(pizzas: any) {
  let ret = [];
  for (const index in pizzas.ingredients) {
    ret.push(pizzas.ingredients[index]._id);
  }
  return ret;
}
