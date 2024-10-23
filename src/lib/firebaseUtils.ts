import { db } from "../../firebaseConfig";
import { collection, writeBatch, doc } from "firebase/firestore";
import { recipes } from "./types";

export const BatchAddCookingSteps = async (steps: recipes[]) => {
  const batch = writeBatch(db);

  steps.forEach((step) => {
    const stepRef = doc(collection(db, "recipes"));
    batch.set(stepRef, step);
  });

  try {
    await batch.commit();
    console.log("Batch write successful");
  } catch (error) {
    console.error("Error adding documents: ", error);
  }
};