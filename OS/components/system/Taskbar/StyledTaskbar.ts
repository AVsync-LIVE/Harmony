import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const StyledTaskbar = styled.nav`
  background: var(--F_Background_Alternating);
  bottom: 0;
  contain: size layout;
  height: ${TASKBAR_HEIGHT}px;
  left: 0;
  position: absolute;
  display: flex;
  right: 0;
  width: 100vw;
  z-index: 100000;
`;

export default StyledTaskbar;