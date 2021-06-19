import React, { Suspense, lazy, useContext, useState, useMemo } from 'react';
import { dialogConstants } from './dialog-constants';

import { Dialogs } from './dialogs';

export const DialogsContext = React.createContext({});

export const DialogsContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

  const [type, setType] = useState(dialogConstants.type.SNACKBAR);
  const [positiveButton, setPositiveButton] = useState(null);
  const [negativeButton, setNegativeButton] = useState(null);

  const onShowDialog = ({
    typeProp = dialogConstants.type.SNACKBAR,
    mode = dialogConstants.mode.info,
    positiveButtonProp,
    negativeButtonProp,
    message: messageProp,
    title: titleProp
  }) => {
    console.log('ran show dialog');
    setType(typeProp);
    setIsVisible(true);
    setTitle(titleProp);
    setMessage(messageProp);
    setPositiveButton({
      callback: () => {
        setIsVisible(false);
        if (positiveButtonProp) positiveButtonProp.callback();
      },
      content: positiveButtonProp.content
    });
    setNegativeButton({
      callback: () => {
        setIsVisible(false);
        if (negativeButtonProp) negativeButtonProp.callback();
      },
      content: positiveButtonProp.content
    });
  };

  return (
    <DialogsContext.Provider value={{ onShowDialog }}>
      {children}
      {isVisible ? (
        <Dialogs
          type={type}
          title={title}
          message={message}
          positiveButton={positiveButton}
          negativeButton={negativeButton}
        />
      ) : (
        'Ingen dialog'
      )}
    </DialogsContext.Provider>
  );
};
