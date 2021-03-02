/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import {useState} from 'react'
import styled from '@emotion/styled/macro'
import DrawerButton from './DrawerButton/DrawerButton'
import '../../css-vars.css'
import ThemeToggle from '../UI/ThemeToggle/ThemeToggle'
import { FormattedMessage } from 'react-intl';
import {Link} from '../UI/Button/Button'

const SideDrawer = styled.div(
  {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--colors-primary)",
    height: "100vh",
    color: "var(--colors-menu-text)",
    left: "0",
    top: "0",
    transition: "all 0.3s ease-out",
  },
  (props) => ({
    width: props.active ? "20rem" : "5rem",
  })
);

const MenuList = styled.ul(
  {
    marginTop: "5rem",
    marginLeft: "2rem",
    listStyle: "none",
    display: "flex",
    height: "100%",
    float: "right",
    flexDirection: "column",
    alignItems: "start",
    marginRight: "0",
    transition: "opacity .5s linear;",
  },
  (props) => ({
    visibility: props.active ? "visible" : "hidden",
    opacity: props.active ? "1" : "0",
  })
);

const styleItem = {
  margin: "1.25rem 0",
  fontSize: "2rem",
  marginRight: "1.5rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
  ":hover": {
    color: "var(--colors-menu-text-hover)",
  }
}

const ItemList = styled(Link)(styleItem);
    

const Navbar = (props) => {
    const [active, setActive] = useState(false)

    const handleNavbarActivity = () => {
        setActive(active => !active)
    }

    const handleLogout= () => {
      handleNavbarActivity()
      props.onLogout() 
    }

    return (
            <SideDrawer active={active}>
                <DrawerButton handleClick={() => handleNavbarActivity()} active={active}/>
                <MenuList active={active}>
                    <ItemList link='/global'>
                        <FormattedMessage  id='menu.position'/>
                    </ItemList>
                    <ItemList link="/expenses">
                          <FormattedMessage  id='menu.expenses'/>
                    </ItemList>
                    <ItemList link="/incomes">
                        <FormattedMessage  id='menu.incomes'/>
                    </ItemList>
                    <ItemList link="/accounts">
                          <FormattedMessage  id='menu.accounts'/>
                    </ItemList>
                    <ItemList link="/categories">
                          <FormattedMessage  id='menu.categories'/>
                    </ItemList>
                    <span css={styleItem}>
                        <ThemeToggle />
                    </span>
                    <ItemList onClick={() => handleLogout()} link="/">
                          <FormattedMessage id='menu.logout'/>
                    </ItemList>
                </MenuList>
            </SideDrawer>
    )
}

export default Navbar