export type recipes = {
    id : string,
    name: string,
    picture: string | null,
    difficulty: string,
    cookTime: string,
    ingredients: ingredients[],
    cookingSteps : cookingSteps[]
}


export type ingredients = {
    name: string,
    unit: number,
    unitType: string,
}

export type cookingSteps = {
    name: string,
    order: number,
    time: number,
    isTimed: boolean,
}

export interface Recipe {
  name: string;
  picture: string;
  difficulty: string;
  cookTime: string;
  ingredients: {
    name: string;
    unit: number;
    unitType: string;
  }[];
  cookingSteps: {
    name: string;
    order: number;
    time: number;
    isTimed: boolean;
  }[];
}

export interface RecipeWithId {
  id: string;
  data: Recipe;
}