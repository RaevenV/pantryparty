

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
  rating:number;
  totalCompleted:number;
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