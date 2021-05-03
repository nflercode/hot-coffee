import React from 'react';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { Router } from './components/router/router';

export default function App() {

  return (
    <>
    <Provider store={store}>
      <Router />
    </Provider>   
    </>
  );
}
