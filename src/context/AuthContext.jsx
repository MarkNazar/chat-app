import { createContext, useCallback, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUserInfo = useCallback(async (uid) => {
    if (!uid) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCurrentUser(docSnap.data());
        setIsLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        setCurrentUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setCurrentUser(null);
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        getCurrentUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
