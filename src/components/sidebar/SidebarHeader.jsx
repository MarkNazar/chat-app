import { HiOutlineArrowRightOnRectangle, HiOutlinePlus } from "react-icons/hi2";
import Avatar from "../ui/Avatar";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import useAuthContext from "../../hooks/useAuthContext";
import SearchUser from "../ui/SearchUser";
import { useState } from "react";
const StyledSidebarHeader = styled.div`
  padding: 10px;
  background-color: var(--header-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 66px;
`;

const StyledLoggOutButton = styled.button`
  font-size: 30px;
  display: flex;
  background: none;
  border: none;
  color: var(--icon-color-light);
  & svg {
  }
`;

const StyledUserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledAddButton = styled.button`
  font-size: 30px;
  display: flex;
  background: none;
  border: none;
  color: var(--icon-color-light);
  & svg {
  }
`;

// const StyledButton = styled.button`
//   background-color: var(--own);
//   padding: 8px 16px;
//   border: none;
//   border-radius: 8px;
// `;

const StyledIcons = styled.div`
  display: flex;
  gap: 5px;
`;

const SidebarHeader = () => {
  const { currentUser } = useAuthContext();

  const [openModal, setOpenModal] = useState(false);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <StyledSidebarHeader>
      <StyledUserInfo>
        <Avatar src={currentUser.avatar} />
        <span>{currentUser.username}</span>
      </StyledUserInfo>

      <StyledIcons>
        <StyledAddButton onClick={() => setOpenModal(true)}>
          <HiOutlinePlus />
        </StyledAddButton>

        <StyledLoggOutButton onClick={handleSignOut}>
          <HiOutlineArrowRightOnRectangle />
        </StyledLoggOutButton>
      </StyledIcons>
      {openModal && (
        <SearchUser openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </StyledSidebarHeader>
  );
};

export default SidebarHeader;
