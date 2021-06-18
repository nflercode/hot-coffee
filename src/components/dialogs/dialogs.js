import React, { Suspense, lazy, useContext } from "react";
import {  useSelector, useDispatch } from 'react-redux';
import { DialogsContext } from "./dialogs-context";

export const Dialogs = () => {
    return (
        <div>
            Jag är en dialog
        </div>
    );
};