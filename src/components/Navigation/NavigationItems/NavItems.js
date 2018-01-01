import React from 'react';

import NavItem from './NavigationItem/NavItem';
import classes from './NavItems.css';

const navItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/">Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default navItems;