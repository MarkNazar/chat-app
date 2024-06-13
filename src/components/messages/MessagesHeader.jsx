import useMessageContext from "../../hooks/useMessageContext";
import Avatar from "../ui/Avatar";
import styled from "styled-components";

const StyledMessagesHeader = styled.div`
  padding: 10px;
  background-color: var(--header-bg);
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 66px;
`;

const SidebarHeader = () => {
  const { user } = useMessageContext();
  return (
    <StyledMessagesHeader>
      <Avatar src={user.avatar} />
      <span>{user.username}</span>
    </StyledMessagesHeader>
  );
};

export default SidebarHeader;
