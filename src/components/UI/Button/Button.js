/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled/macro'
import { Link as RouteLink, useRouteMatch } from 'react-router-dom';
import Spinner from '../Spinner/Spinner'

const StyledButton = styled.button(
  {
    color: "var(--colors-menu-text)",
    padding: "1rem 2rem",
    cursor: "pointer",
    border: "none",
    fontSize: "1.5rem",
    fontWeight: "600",
    borderRadius: "5px",
  },
  ({ design }) => ({
    backgroundColor: `var(--colors-${design}-button)`,
    "&:hover": {
      backgroundColor: `var(--colors-${design}-button-highlight)`,
    },
  })
);


const Link = (props) => {
  const match = useRouteMatch(props.link);
  // const match = route ? route.isExact : false;
  return (
    <RouteLink
      css={[
        {
          textDecoration: "none",
          color: "white",
        },
        match
          ? {
              borderLeft: "5px solid var(--colors-menu-text-hover)",
              paddingLeft: "1rem",
              backgroundColor: "var(--colors-primary-highlight)"
            }
          : null,
      ]}
      to={props.link}
      {...props}
    >
      {props.children}
    </RouteLink>
  );
};

const Button = ({onClick, loading, disabled, type, design, children, ...props}) => (

  
  <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      design={design}
      {...props}
    >
      { loading ? <Spinner/>  : children}  
  </StyledButton>
)


export {Button, Link};