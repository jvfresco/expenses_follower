/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React from 'react';
import { Link as RouteLink, useRouteMatch } from 'react-router-dom';



const Link = (props) => {
  const route = useRouteMatch(props.link);
  const match = route ? route.isExact : false;
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

const Button = (props) => (
  <button
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
      {...props}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
)


export {Button, Link};