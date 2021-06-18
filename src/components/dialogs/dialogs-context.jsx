import React, { Suspense, lazy, useContext, useState } from 'react';
import { dialogConstants } from './dialog-constants';

import { Dialogs } from './dialogs';

export const DialogsContext = React.createContext({});

export const DialogsContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState(dialogConstants.type.SNACKBAR);
  const [dialogCallbackPositive, setDialogCallbackPositive] = useState(
    () => {}
  );
  const [dialogCallbackNegative, setDialogCallbackNegative] = useState(
    () => {}
  );

  const onShowDialog = ({
    type = dialogConstants.type.SNACKBAR,
    mode = dialogConstants.mode.info,
    callbackPositive,
    callbackNegative
  }) => {
    console.log('ran show dialog');
    setType(type);
    setIsVisible(true);
    //setDialogCallbackPositive(() => {
    //  setIsVisible(false);
    //  if (callbackPositive) callbackPositive();
    //});
    //setDialogCallbackNegative(() => {
    //  setDialogCallbackNegative(() => {
    //    setIsVisible(false);
    //    if (callbackNegative) callbackNegative();
    //  });
    //});
  };

  return (
    <DialogsContext.Provider value={{ onShowDialog }}>
      {children}
      {isVisible ? (
        <Dialogs
          onPositive={dialogCallbackPositive}
          onNegative={dialogCallbackNegative}
          type={type}
        />
      ) : (
        'Ingen dialog'
      )}
    </DialogsContext.Provider>
  );
};
