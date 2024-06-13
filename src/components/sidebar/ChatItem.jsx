import useMessageContext from "../../hooks/useMessageContext";

import styled from "styled-components";
import Avatar from "../ui/Avatar";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import useAuthContext from "../../hooks/useAuthContext";
import { db } from "../../services/firebase";
import { formatDate } from "../../utils/helpers";

const StyledChatItem = styled.li`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #d1d7db5d;
  padding: 5px;

  cursor: pointer;
`;

const StyledName = styled.p`
  font-size: 1.125rem;
  color: var(--primary-strong);
`;

const StyledLastChat = styled.p`
  color: var(--primary);
  word-break: break-all;
`;

const StyledNameHeader = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const StyledTime = styled.div`
  font-size: 14px;
`;

const StyledMessageInfo = styled.div`
  flex: 1;
`;

const ChatItem = ({ chatList, chatLists }) => {
  console.log(chatList);
  const { dispatch } = useMessageContext();
  const { currentUser } = useAuthContext();

  const handleSelectChat = async () => {
    const userChats = chatLists?.map((chat) => {
      const { user, ...rest } = chat;

      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chatList.chatId
    );

    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userChats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });

      dispatch({
        type: "chat/changeChat",
        payload: { chatId: chatList.chatId, user: chatList.user },
      });
    } catch (error) {
      console.log(error);
    }

    // const userChatRef = doc(db, "userChats", currentUser.id);
    // const userChatSnapShot = await getDoc(userChatRef);

    // if (userChatSnapShot.exists()) {
    //   const userChats = userChatSnapShot.data();

    //   const chatIndex = userChats.chats.findIndex((c) => c.chatId === chatId);

    //   userChats.chats[chatIndex].isSeen = true;

    //   await updateDoc(userChatRef, {
    //     chats: userChats.chats,
    //   });
    // }
  };

  return (
    <StyledChatItem
      style={{
        backgroundColor: chatList.isSeen ? "transparent" : "#00a88458",
      }}
      onClick={() => handleSelectChat(chatList)}
    >
      <Avatar src={chatList.user.avatar} size="medium" />
      <StyledMessageInfo>
        <StyledNameHeader>
          <StyledName>{chatList.user.username}</StyledName>
          <StyledTime>{formatDate(chatList.updatedAt)}</StyledTime>
        </StyledNameHeader>

        <StyledLastChat>
          {chatList.lastMessage.length > 10
            ? `${chatList.lastMessage.substring(0, 45)}...`
            : chatList.lastMessage}
        </StyledLastChat>
      </StyledMessageInfo>
    </StyledChatItem>
  );
};

export default ChatItem;
