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
  const [icon, setIcon] = useState(null);

  const onShowDialog = ({
    type: typeProp = dialogConstants.type.SNACKBAR,
    mode = dialogConstants.mode.info,
    icon: iconProp,
    positiveButtonProp,
    negativeButtonProp,
    message: messageProp,
    title: titleProp
  }) => {
    setType(typeProp);
    setIsVisible(true);
    if (titleProp) setTitle(titleProp);
    if (messageProp) setMessage(messageProp);
    if (iconProp) setIcon(iconProp);
    if (positiveButtonProp)
      setPositiveButton({
        callback: () => {
          setIsVisible(false);
          if (positiveButtonProp) positiveButtonProp.callback();
        },
        content: positiveButtonProp.content
      });
    if (negativeButtonProp)
      setNegativeButton({
        callback: () => {
          setIsVisible(false);
          if (negativeButtonProp) negativeButtonProp.callback();
        },
        content: negativeButtonProp.content
      });

    if (typeProp === 'ALERT') {
      setTimeout(() => {
        setIsVisible(false);
      }, 1200);
    }
  };

  return (
    <DialogsContext.Provider value={{ onShowDialog }}>
      {children}
      {isVisible && (
        <Dialogs
          type={type}
          title={title}
          message={message}
          positiveButton={positiveButton}
          negativeButton={negativeButton}
          icon={icon}
        />
      )}
    </DialogsContext.Provider>
  );
};
