import { createContext, useContext, useState, useEffect } from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { UserData, UserContextType, SignInParams } from "@/lib/types/userTypes";




const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setFirebaseUser(user);

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Error fetching user data"
          );
        }
      } else {
        setUserData(null);
      }

      setLoading(false);

      setError(null);
    });

    return unsubscribe;
  }, []);

  const createUserData = async (
    firebaseUser: FirebaseUser,
    params: SignInParams
  ): Promise<UserData> => {
    const newUserData: UserData = {
      id: firebaseUser.uid,
      name: params.name || "anonymous",
      email: firebaseUser.email || "",
      age: params.age || 0,
      password: "",
      completedRecipes: [],
      weeklyCompleted: 0,
      rank: "Beginner",
    };

    const userDocRef = doc(db, "users", firebaseUser.uid);
    await setDoc(userDocRef, newUserData);
    return newUserData;
  };

  const signIn = async (params: SignInParams) => {
    try {
      let userCredential;

      if (params.email && params.password) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          params.email,
          params.password
        );
      } else {
        throw new Error("Invalid sign-in parameters");
      }

      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const newUserData = await createUserData(userCredential.user, params);
        setUserData(newUserData);
      } else {
        const existingData = userDoc.data() as UserData;
        await updateDoc(userDocRef, {
          lastLogin: serverTimestamp(),
        });
        setUserData(existingData);
      }

      return userCredential.user;
    } catch (error) {
      console.error("Sign-in error:", error);
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error; 
    }
  };

  const register = async (params: SignInParams) => {
    try {
      if (!params.email || !params.password) {
        throw new Error("Email and password are required");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      const newUserData = await createUserData(userCredential.user, params);
      setUserData(newUserData);

      return userCredential.user;
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserData(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error signing out");
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        firebaseUser,
        userData,
        loading,
        error,
        signIn,
        signOut,
        register
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
