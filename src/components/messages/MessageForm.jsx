import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

import { HiOutlinePaperAirplane, HiOutlinePhoto } from "react-icons/hi2";
import styled from "styled-components";
import { db } from "../../services/firebase";
import useMessageContext from "../../hooks/useMessageContext";
import useAuthContext from "../../hooks/useAuthContext";

const StyledMessageForm = styled.form`
  padding: 10px;
  background-color: var(--header-bg);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

const StyledInputText = styled.input`
  min-height: 30px;
  padding: 10px;
  border-radius: 8px;
  background-color: #2a3942;
  border: none;
  outline: none;
  flex: 1;
  color: var(--primary);
`;

const StyledUploadButton = styled.label`
  background: none;
  border: none;
  color: var(--icon-color-light);
  font-size: 20px;
`;

const StyledSendButton = styled.button`
  background: none;
  border: none;
  color: var(--icon-color-light);
  font-size: 20px;
`;

const MessageForm = () => {
  const [text, setText] = useState("");
  const { chatId, user } = useMessageContext();
  const { currentUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Timestamp.now(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatSnapShot = await getDoc(userChatRef);

        if (userChatSnapShot.exists()) {
          const userChats = userChatSnapShot.data();

          const chatIndex = userChats.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChats.chats[chatIndex].lastMessage = text;
          userChats.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChats.chats[chatIndex].updatedAt = Timestamp.now();

          await updateDoc(userChatRef, {
            chats: userChats.chats,
          });
        }
      });
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledMessageForm onSubmit={handleSubmit}>
      <StyledUploadButton htmlFor="file">
        <HiOutlinePhoto />
      </StyledUploadButton>
      <input type="file" hidden id="file" />
      <StyledInputText
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <StyledSendButton>
        <HiOutlinePaperAirplane />
      </StyledSendButton>
    </StyledMessageForm>
  );
};

export default MessageForm;
