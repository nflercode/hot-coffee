import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Router } from './components/router/router';
import AuthController from './components/auth-controller/auth-controller';
import Socket from './components/socket/socket';
import { DialogsContextProvider } from './components/dialogs/dialogs-context';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AuthController />
          <Socket />
        <DialogsContextProvider>
          <Router />
        </DialogsContextProvider>
      </Provider>
    </>
  );
}
