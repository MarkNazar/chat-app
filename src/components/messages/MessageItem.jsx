import styled from "styled-components";
import useAuthContext from "../../hooks/useAuthContext";
import { formatDate } from "../../utils/helpers";

const StyledMessageItem = styled.li`
  padding: 10px;
  background-color: ${({ variant }) =>
    variant === "own" ? "var(--own)" : "var(--header-bg)"};
  align-self: ${({ variant }) =>
    variant === "own" ? "flex-end" : "flex-start"};
  word-break: break-all;
  border-radius: 8px;
  width: max-content;
  max-width: 300px;
`;

StyledMessageItem.defaultProps = {};

const StyleTime = styled.div`
  text-align: right;
  font-size: 13px;
`;

const MessageItem = ({ message }) => {
  const { currentUser } = useAuthContext();

  const isOwn = message.senderId === currentUser.id;
  return (
    <StyledMessageItem variant={isOwn ? "own" : ""}>
      <span>{message.text}</span>{" "}
      <StyleTime>{formatDate(message.createdAt)}</StyleTime>
    </StyledMessageItem>
  );
};

export default MessageItem;
