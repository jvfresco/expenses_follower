import styled from '@emotion/styled/macro'
import {useState} from 'react'

const DrawerToggle = styled.div({
    width: '5rem',
    height: '5rem',
    display: 'block',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    textAlign: 'center'
})

const DrawerToggleIcon = styled.span(
  {
    position: "relative",
    marginTop: "2.5rem",
  
    "&, &:before, &:after": {
      width: "4rem",
      height: "3px",
      display: "inline-block",
      backgroundColor: "white",
    },

    "&:before, &:after": {
      content: '""',
      position: "absolute",
      left: "0",
      transition: "all .2s",
    },
  },
  (props) => ({
    "&:before": {
      top: props.active ? "0" : "-1.3rem",
      transform: props.active ? "rotate(135deg)" : "rotate(0)",
    },

    "&:after": {
      top: props.active ? "0" : "1.4rem",
      transform: props.active ? "rotate(-135deg)" : "rotate(0)",
    },

    "&": {
      backgroundColor: props.active ? "transparent" : "white",
    },
  })
);


const DrawerButton = ({active, handleClick}) => {

//active = true - displays an X
//active = false - displays 3 paralel lines

return (
  <DrawerToggle onClick= {() => handleClick()}>
        <DrawerToggleIcon active={active}/>
  </DrawerToggle>
);
}

export default DrawerButton