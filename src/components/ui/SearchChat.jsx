import { HiOutlineSearch } from "react-icons/hi";
import styled from "styled-components";

const StyledSearchChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  width: 90%;
  background-color: var(--header-bg);
  border-radius: 8px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--primary);
  font-size: 1rem;

  &::placeholder {
    color: var(--primary);
  }
`;

const SearchChat = () => {
  return (
    <StyledSearchChat>
      <HiOutlineSearch />
      <StyledInput placeholder="Search" />
    </StyledSearchChat>
  );
};

export default SearchChat;
