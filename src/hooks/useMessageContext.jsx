import { useContext } from "react";
import MessageContext from "../context/MessageContext";

const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (context === undefined)
    throw new Error("Message Context was used outside Message Provider");
  return context;
};

export default useMessageContext;
