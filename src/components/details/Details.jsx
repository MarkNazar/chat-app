import DetailsHeader from "./DetailsHeader";

import styled from "styled-components";

const StyledDetails = styled.aside`
  flex: 1;
`;

const Details = () => {
  return (
    <StyledDetails>
      <DetailsHeader />
    </StyledDetails>
  );
};

export default Details;
