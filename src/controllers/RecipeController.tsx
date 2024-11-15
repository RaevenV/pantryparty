import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Recipe } from "@/lib/types/recipeTypes";
import { RecipeWithId } from "@/lib/types/recipeTypes";

//uda terlanjur pake controller + context, harusnya context aja tp males ganti

export class RecipeController {
  static async getAllRecipes(): Promise<RecipeWithId[]> {
    try {
      const recipesCollection = collection(db, "recipes");
      const recipeSnapshot = await getDocs(recipesCollection);

      const recipes: RecipeWithId[] = recipeSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() as Recipe,
      }));

      localStorage.setItem("recipes", JSON.stringify(recipes));
      return recipes;
    } catch (error) {
      const cached = localStorage.getItem("recipes");
      if (cached) {
        return JSON.parse(cached) as RecipeWithId[];
      }
      throw error;
    }
  }

  static async getRecipeById(id: string): Promise<RecipeWithId | undefined> {
    const recipes = await this.getAllRecipes();
    return recipes.find((recipe) => recipe.id === id);
  }

  static async searchRecipes(
    searchTerm: string,
    recipes: RecipeWithId[]
  ): Promise<RecipeWithId[]> {
    if (!searchTerm.trim()) return recipes;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return recipes.filter(
      (recipe) =>
        recipe.data.name.toLowerCase().includes(lowerSearchTerm) ||
        recipe.data.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(lowerSearchTerm)
        )
    );
  }

  static cacheDuration = 60 * 60 * 1000;

  static clearCacheIfExpired(): void {
    const cache = localStorage.getItem("recipes");
    if (!cache) return;

    const { timestamp } = JSON.parse(cache);
    const isExpired = Date.now() - timestamp > this.cacheDuration;

    if (isExpired) {
      this.clearCache();
    }
  }

  static clearCache(): void {
    localStorage.removeItem("recipes");
  }
}
