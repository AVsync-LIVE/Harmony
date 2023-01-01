import { m as motion } from "framer-motion";
import styled from "styled-components";

type StyledWindowProps = {
  $backgroundColor?: string;
  $isForeground: boolean;
};

const StyledWindow = styled(motion.section)<StyledWindowProps>`
  background-color: var(--F_Background);
  border-radius: .5rem;
  overflow: hidden;
  box-shadow: ${({ $isForeground, theme }) =>
    $isForeground
      ? theme.colors.window.shadow
      : theme.colors.window.shadowInactive};
  contain: strict;
  height: 100%;
  outline: ${({ $isForeground, theme }) =>
    `${theme.sizes.window.outline} solid ${
      $isForeground
        ? theme.colors.window.outline
        : theme.colors.window.outlineInactive
    }`};
  overflow: hidden;
  position: absolute;
  width: 100%;

  header + * {
    height: ${({ theme }) =>
      `calc(100% - ${theme.sizes.titleBar.height}px) !important`};
  }
`;

export default StyledWindow;