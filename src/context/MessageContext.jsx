import { createContext, useReducer, useState } from "react";

export const MessageContext = createContext();

const initialState = {
  chatId: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "chat/changeChat":
      return {
        ...state,
        chatId: action.payload.chatId,
        user: action.payload.user,
      };
    default:
      throw new Error("Action type not found");
  }
};

export const MessageProvider = ({ children }) => {
  const [{ chatId, user }, dispatch] = useReducer(reducer, initialState);

  return (
    <MessageContext.Provider value={{ chatId, user, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
