import styled from "styled-components";
import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import useAuthContext from "../../hooks/useAuthContext";

const StyledChatLists = styled.ul`
  width: 95%;
  margin: 0 auto;
  list-style: none;
`;

const StyledText = styled.p`
  padding: 10px;
  text-align: center;
`;

const Chats = () => {
  const [chatLists, setChatLists] = useState([]);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChatLists(
          chatData.sort((a, b) => {
            return b.updatedAt - a.updatedAt;
          })
        );
      }
    );

    return () => unsub();
  }, [currentUser.id]);

  if (!chatLists.length) return <StyledText>No chats yet.</StyledText>;

  return (
    <StyledChatLists>
      {chatLists.map((chatList) => {
        return (
          <ChatItem
            key={chatList.chatId}
            chatList={chatList}
            chatLists={chatLists}
          />
        );
      })}
    </StyledChatLists>
  );
};

export default Chats;
