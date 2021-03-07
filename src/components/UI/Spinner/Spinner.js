import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'

const spin = keyframes({
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)",
    }
})

const StyledSpinner = styled.div({
    display: "inline-block",
    position: "relative",
    width: "1.4rem",
    height: "1.4rem",
    transform: "translate(-50%, -50%)",
  "div": {
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: "24px",
    height: "24px",
    margin: "4px",
    border: "3px solid var(--colors-menu-text)",
    borderRadius: "50%",
    animation: `${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: "var(--colors-menu-text) transparent transparent transparent",
  },

  "div:nth-of-type(1)": {
    animationDelay: "-0.45s",
  },
  "div:nth-of-type(2)":  {
    animationDelay: "-0.3s",
  },
  "div:nth-of-type(3)":  {
    animationDelay: "-0.15s",
  },
})

export default function Spinner() {
  return (
    <StyledSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledSpinner>
  );
}