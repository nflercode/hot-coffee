import React, { Suspense, lazy, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dialogConstants } from './dialog-constants';
import { DialogsContext } from './dialogs-context';
import { Snackbar } from './snackbar';

export const Dialogs = ({ type, onclick }) => {
  if (type === dialogConstants.type.SNACKBAR) {
    return (
      <Snackbar
        title='test'
        message='asdads'
        positiveButton={{ onclick, content: 'blöblö' }}
        negativeButton={{ onclick, content: 'blöblö' }}
      />
    );
  }
  return <div>Jag är en dialog</div>;
};
