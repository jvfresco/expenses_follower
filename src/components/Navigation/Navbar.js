/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React, {useState} from 'react'
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
  width: "90%",
  padding: "1.25rem 1rem",
  fontSize: "2rem",
  marginRight: "1.5rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
  ":hover": {
    color: "var(--colors-menu-text-hover)",
  }
}

const ItemList = styled(Link)(styleItem);
const SubItemList = styled(ItemList)({
  fontSize: '1.4rem', 
  fontWeight: '600', 
  margin: '0 0 0 1.5rem'
})    

const Navbar = (props) => {
    const [active, setActive] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const handleNavbarActivity = () => {
        setActive(active => !active)
    }

    const handleLogout= () => {
      handleNavbarActivity()
      props.onLogout() 
    }

    return (
      <SideDrawer active={active}>
        <DrawerButton
          handleClick={() => handleNavbarActivity()}
          active={active}
        />
        <MenuList active={active}>
          <ItemList link="/global">
            <FormattedMessage id="menu.position" />
          </ItemList>
          <ItemList link="/expenses">
            <FormattedMessage id="menu.expenses" />
          </ItemList>
          <ItemList link="/incomes">
            <FormattedMessage id="menu.incomes" />
          </ItemList>
          <ItemList link="/accounts">
            <FormattedMessage id="menu.accounts" />
          </ItemList>
          <span
            css={styleItem}
            onClick={() => setDropdown((dropdown) => !dropdown)}
          >
            <FormattedMessage id="menu.categories" />
          </span>
          {dropdown ? (
            <React.Fragment>
              <SubItemList link="/expense-categories">
                <FormattedMessage id="menu.expenseCategories" />
              </SubItemList>
              <SubItemList link="/income-categories">
                <FormattedMessage id="menu.incomeCategories" />
              </SubItemList>
              <SubItemList link="/payment-types">
                <FormattedMessage id="menu.paymentTypes" />
              </SubItemList>
              <SubItemList link="/collection-types">
                <FormattedMessage id="menu.collectionTypes" />
              </SubItemList>
            </React.Fragment>
          ) : null}
          <span css={styleItem}>
            <ThemeToggle />
          </span>
          <span onClick={() => handleLogout()} css={styleItem}>
            <FormattedMessage id="menu.logout" />
          </span>
        </MenuList>
      </SideDrawer>
    );
}

export default Navbar