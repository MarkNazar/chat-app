import { HiOutlineXMark } from "react-icons/hi2";
import Avatar from "../ui/Avatar";
import styled from "styled-components";

const StyledDetailsHeader = styled.div`
  padding: 10px;
  background-color: var(--header-bg);
  display: flex;
  gap: 10px;
  align-items: center;
  min-height: 66px;
`;

const SidebarHeader = () => {
  return (
    <StyledDetailsHeader>
      <HiOutlineXMark />
      <span>Contact info</span>
    </StyledDetailsHeader>
  );
};

export default SidebarHeader;
