import styled from "styled-components";
const StyledAvatar = styled.img`
  border-radius: 50%;
  width: ${({ size }) =>
    size === "small" ? "40px" : size === "medium" ? "50px" : "200px"};
  height: ${({ size }) =>
    size === "small" ? "40px" : size === "medium" ? "50px" : "200px"};
  object-fit: cover;
`;

const Avatar = ({ size, src = "./circle-orange-shape.png" }) => {
  return <StyledAvatar size={size} src={src} />;
};

StyledAvatar.defaultProps = {
  size: "small",
};

export default Avatar;
