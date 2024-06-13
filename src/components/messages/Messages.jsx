import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import MessagesLists from "./MessagesLists";
import styled from "styled-components";

import useMessageContext from "../../hooks/useMessageContext";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const StyledMessages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Messages = () => {
  const { chatId } = useMessageContext();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setMessages(res.data());
    });

    return () => unsub();
  }, [chatId]);

  return (
    <StyledMessages>
      <MessagesHeader />
      <MessagesLists messages={messages.messages} />
      <MessageForm />
    </StyledMessages>
  );
};

export default Messages;
