import { HiOutlineSearch } from "react-icons/hi";
import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  width: 95%;
  margin: 0 auto;
  padding-bottom: 10px;
  border-bottom: 1px solid #d1d7db5d;
`;

const StyledSearchChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  width: 100%;
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

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 100px;
  background-color: var(--header-bg);
  border: none;
  color: var(--primary);
  font-size: 1rem;
`;

const StyledFilterButtonColum = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Filter = () => {
  return (
    <StyledFilter>
      <StyledSearchChat>
        <HiOutlineSearch />
        <StyledInput placeholder="Search" />
      </StyledSearchChat>
      <StyledFilterButtonColum>
        <StyledButton>All</StyledButton>
        <StyledButton>Unread</StyledButton>
      </StyledFilterButtonColum>
    </StyledFilter>
  );
};

export default Filter;
