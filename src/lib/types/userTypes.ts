import { RecipeWithId } from "./recipeTypes";
import { User as FirebaseUser } from "firebase/auth";


export type UserData = {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  password: string;
  completedRecipes: RecipeWithId[];
  weeklyCompleted: number;
  rank: string;
};

export type UserContextType = {
  firebaseUser: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (params: SignInParams) => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  register: (params: SignInParams) => Promise<FirebaseUser>;
};

export interface SignInParams {
  email: string;
  password: string;
  provider?: string;
  age?: number;
  name?:string;
  phone?:string;
}


// Sous Chef
// Prep Cook
// Pantry Protégé
// Kitchen Connoisseur
// Michelin Awardee
