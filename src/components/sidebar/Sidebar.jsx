import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import Filter from "../ui/Filter";
import Chats from "./Chats";

const StyledSidebar = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <SidebarHeader />
      <Filter />
      <Chats />
    </StyledSidebar>
  );
};

export default Sidebar;
