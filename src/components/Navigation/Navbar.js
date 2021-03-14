/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React, {useState} from 'react'
import styled from '@emotion/styled/macro'
import DrawerButton from './DrawerButton/DrawerButton'
import '../../css-vars.css'
import ThemeToggle from '../UI/ThemeToggle/ThemeToggle'
import { FormattedMessage } from 'react-intl';
import {Link} from '../UI/Button/Button'
import {useAuth} from '../../context/auth-context'
import * as ENDPOINTS from '../../routes/endpoints'

const SideDrawer = styled.div(
  {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--colors-primary)",
    height: "100vh",
    color: "var(--colors-menu-text)",
    left: "0",
    top: "0",
    transition: "width 0.3s ease-out",
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

const Navbar = () => {
    const {logout} = useAuth()
    const [active, setActive] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const handleNavbarActivity = () => {
        setActive(active => !active)
    }

    const handleLogout= () => {
      handleNavbarActivity()
      logout()
    }

    return (
      <SideDrawer active={active}>
        <DrawerButton
          handleClick={() => handleNavbarActivity()}
          active={active}
        />
        <MenuList active={active}>
          <ItemList link={ENDPOINTS.GLOBAL}>
            <FormattedMessage id="menu.position" />
          </ItemList>
          <ItemList link={ENDPOINTS.EXPENSES}>
            <FormattedMessage id="menu.expenses" />
          </ItemList>
          <ItemList link={ENDPOINTS.INCOMES}>
            <FormattedMessage id="menu.incomes" />
          </ItemList>
          <ItemList link={ENDPOINTS.ACCOUNTS}>
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
              <SubItemList link={ENDPOINTS.EXPENSE}>
                <FormattedMessage id="menu.expenseCategories" />
              </SubItemList>
              <SubItemList link={ENDPOINTS.INCOME}>
                <FormattedMessage id="menu.incomeCategories" />
              </SubItemList>
              <SubItemList link={ENDPOINTS.PAYMENT}>
                <FormattedMessage id="menu.paymentTypes" />
              </SubItemList>
              <SubItemList link={ENDPOINTS.COLLECTION}>
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