import styled from "styled-components";

const StyledSeparator = styled.div`
  width: 0.2px;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.3;
`;

const Separator = () => {
  return <StyledSeparator />;
};

export default Separator;
