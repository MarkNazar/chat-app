import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context was used outside Auth Provider");
  return context;
};

export default useAuthContext;
