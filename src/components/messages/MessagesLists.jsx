import styled from "styled-components";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";

const StyledMessagesLists = styled.ul`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 100%;
  list-style: none;
  gap: 10px;
  overflow: scroll;
`;

const StyledNoMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MessagesLists = ({ messages = [] }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length)
    return <StyledNoMessage>Send me a message!</StyledNoMessage>;
  return (
    <StyledMessagesLists>
      {messages.map((message) => {
        return <MessageItem key={message.createdAt} message={message} />;
      })}
      <div ref={endRef}></div>
    </StyledMessagesLists>
  );
};

export default MessagesLists;
