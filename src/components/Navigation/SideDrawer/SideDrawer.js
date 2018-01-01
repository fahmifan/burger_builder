import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    return (
      <div className={classes.SideDrawer}>
      <div className={classes.Logo}>  
        <Logo />
      </div>
      <nav>
        <NavItems />
      </nav>
      </div>
    );
}

export default sideDrawer;