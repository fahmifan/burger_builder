import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSumamry.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it test well!</h1>
      <div style={{width: '100%', margin: '0 auto'}} >
        <Burger ingredients={props.ingredients} />
      </div>
      <div>
        <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
      </div>
    </div>
  );
}

export default checkoutSummary;