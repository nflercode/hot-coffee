import React, { Suspense, lazy, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dialogConstants } from './dialog-constants';
import { DialogsContext } from './dialogs-context';
import { Snackbar } from './snackbar';

export const Dialogs = ({
  type,
  title,
  message,
  positiveButton,
  negativeButton
}) => {
  if (type === dialogConstants.type.SNACKBAR) {
    return (
      <Snackbar
        title={title}
        message={message}
        positiveButton={positiveButton}
        negativeButton={negativeButton}
      />
    );
  }
  return <div>Jag är en dialog</div>;
};
