import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../../store/store";
import { DialogsContextProvider } from "../dialogs/dialogs-context";

export const UnitTestHarness = ({ store = {}, routes = ["/"], children }) => {
    const mockedStore = configureStore({
        reducer: reducer,
        preloadedState: {
            ...store
        }
    });

    return (
        <DialogsContextProvider>
            <MemoryRouter initialEntries={routes}>
                <Provider store={mockedStore}>{children}</Provider>
            </MemoryRouter>
        </DialogsContextProvider>
    );
};
