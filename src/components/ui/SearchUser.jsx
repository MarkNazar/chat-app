import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import styled from "styled-components";
import Avatar from "./Avatar";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

const StyledSearchUser = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;

const StyledSearchModal = styled.div`
  padding: 40px 20px 20px 20px;
  border-radius: 8px;
  background-color: var(--header-bg);
  width: 300px;
  position: relative;
`;

const StyledSearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledSearchInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  background-color: #2a3942;
  border: none;
  outline: none;
  color: var(--primary);
  flex: 1;
`;

const StyledSearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--own);
  border: none;
  padding: 12px;
  border-radius: 8px;
`;

const StyledCloseSearchButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  color: var(--primary);
  font-size: 1.125rem;
  position: absolute;
  right: 10px;
  top: 10px;
`;
const StyledUserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledUserColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledAddUserButton = styled.button`
  padding: 8px;
  background-color: var(--own);
  padding: 8px;
  border: none;
  border-radius: 8px;
`;

const SearchUser = ({ setOpenModal }) => {
  const { currentUser } = useAuthContext();
  const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    if (!username) return;

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Timestamp.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledSearchUser>
      <StyledSearchModal>
        <StyledCloseSearchButton onClick={() => setOpenModal(false)}>
          <HiOutlineX />
        </StyledCloseSearchButton>
        <StyledSearchForm onSubmit={handleSubmit}>
          <StyledSearchInput
            type="text"
            placeholder="Search user"
            name="username"
          />
          <StyledSearchButton>
            <HiOutlineSearch />
          </StyledSearchButton>
        </StyledSearchForm>
        {user && (
          <StyledUserColumn>
            <StyledUserRow>
              <StyledProfileInfo>
                <Avatar src={user.avatar} />
                <p>{user.username}</p>
              </StyledProfileInfo>
              <StyledAddUserButton onClick={handleAddUser}>
                Add User
              </StyledAddUserButton>
            </StyledUserRow>
          </StyledUserColumn>
        )}
      </StyledSearchModal>
    </StyledSearchUser>
  );
};

export default SearchUser;
