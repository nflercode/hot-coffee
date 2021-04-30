import React from 'react';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import {StartPage} from "./pages/start-page";

export default function App() {

  return (
    <>
    <Provider store={store}>
      <StartPage />
    </Provider>
    </>
  );
}
