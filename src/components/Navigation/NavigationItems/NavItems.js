import React from 'react';

import NavItem from './NavigationItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>Burger Builder</NavItem>
    { props.isAuth && <NavItem link="/orders">Orders</NavItem>}
    { props.isAuth 
      ? <NavItem link="/logout">Log Out</NavItem>
      : <NavItem link="/auth">Authenticate</NavItem>
    }
  </ul>
);

export default navItems;