import React, { Suspense, lazy, useContext } from 'react';
import { Button } from '../button/button';
import './snackbar.css';
export const Snackbar = ({
  title,
  message,
  positiveButton,
  negativeButton
}) => (
  <div className='snackbar-container'>
    <div className='snackbar-title'>{title}</div>
    <div className='snackbar-message'>{message}</div>
    <div className='snackbar-btns-container'>
      <div>
        {negativeButton && (
          <Button theme='negative' block className='snackbar-negative-button'>
            {negativeButton.content}
          </Button>
        )}
      </div>
      <div>
        {positiveButton && (
          <Button block className='snackbar-positive-button'>
            {positiveButton.content}
          </Button>
        )}
      </div>
    </div>
  </div>
);
