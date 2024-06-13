import styled from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { upload } from "../../services/upload";
import useAuthContext from "../../hooks/useAuthContext";

const StyledAuth = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const StyledMain = styled.main`
  display: flex;
  max-width: 700px;
  flex: 1;
  margin: auto;
  gap: 60px;
`;

const StyledLogin = styled.div`
  flex: 1;
`;
const StyledSignUp = styled.div`
  flex: 1;
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledInput = styled.input`
  padding: 10px;
  background-color: var(--header-bg);
  border: none;
  outline: none;
  border-radius: 8px;
  color: var(--primary);
`;

const StyledPassword = styled(StyledInput)``;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: var(--own);
  border: none;
  border-radius: 8px;
  color: var(--primary-heavy);
`;

const StyledSignUpForm = styled(StyledLoginForm)``;

const StyledH2 = styled.h2`
  margin-bottom: 20px;
`;

const StyledSeparator = styled.div`
  width: 0.8px;
  height: 200px;
  background-color: var(--primary);
`;

const StyledUpload = styled.label`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid var(--primary);
`;

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [avatar, setAvatar] = useState({
    file: "",
    url: "",
  });

  const isWorking = isLoggingIn || isSigningUp;

  const handleAvatar = (e) => {
    if (!e.target.files[0]) return;

    const image = e.target.files[0];
    const imageURL = URL.createObjectURL(image);
    setAvatar({
      file: image,
      url: imageURL,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      setIsLoggingIn(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, username } = Object.fromEntries(formData);

    try {
      setIsSigningUp(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseImageURL = await upload(avatar.file);

      await setDoc(doc(db, "users", user.user.uid), {
        email,
        password,
        username,
        avatar: firebaseImageURL,
        id: user.user.uid,
      });

      await setDoc(doc(db, "userChats", user.user.uid), {
        chats: [],
      });

      setAvatar({
        file: "",
        avatar: "",
      });

      e.target.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningUp(false);
    }
  };
  return (
    <StyledAuth>
      <GlobalStyles />
      <StyledMain>
        <StyledLogin>
          <StyledH2>Login</StyledH2>
          <StyledLoginForm onSubmit={handleLogin}>
            <StyledInput type="email" placeholder="Email" name="email" />
            <StyledPassword placeholder="Password" name="password" />
            <div>
              <StyledButton disabled={isWorking}>
                {isLoggingIn ? "Logging In..." : "Login"}
              </StyledButton>
            </div>
          </StyledLoginForm>
        </StyledLogin>
        <StyledSeparator />
        <StyledSignUp>
          <StyledH2>Sign Up</StyledH2>
          <StyledSignUpForm onSubmit={handleSignUp}>
            <StyledUpload htmlFor="avatar">
              {avatar.url ? <StyledAvatar src={avatar.url} /> : "+"}
            </StyledUpload>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleAvatar}
              style={{ display: "none" }}
            />
            <StyledInput placeholder="Username" name="username" />
            <StyledInput type="email" placeholder="Email" name="email" />
            <StyledPassword placeholder="Password" name="password" />
            <div>
              <StyledButton disabled={isWorking}>
                {isSigningUp ? "Signing Up..." : "Sign Up"}
              </StyledButton>
            </div>
          </StyledSignUpForm>
        </StyledSignUp>
      </StyledMain>
    </StyledAuth>
  );
};

export default Login;
