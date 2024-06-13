import styled from "styled-components";
import Details from "./components/details/Details";
import Messages from "./components/messages/Messages";
import Sidebar from "./components/sidebar/Sidebar";
import GlobalStyles from "./styles/GlobalStyles";
import Separator from "./components/ui/Separator";
import Login from "./components/login/Login";
import useAuthContext from "./hooks/useAuthContext";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import useMessageContext from "./hooks/useMessageContext";

const StyledApp = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  margin: 20px;
`;

function App() {
  const { currentUser, isLoading, getCurrentUserInfo } = useAuthContext();
  const { chatId } = useMessageContext();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getCurrentUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [getCurrentUserInfo]);

  if (isLoading) return <div>Loading....</div>;

  if (!currentUser && !isLoading) return <Login />;

  if (currentUser && !isLoading)
    return (
      <StyledApp>
        <GlobalStyles />
        <StyledMain>
          <Sidebar />
          <Separator />
          {chatId && <Messages />}
          <Separator />
          <Details />
        </StyledMain>
      </StyledApp>
    );
}

export default App;
