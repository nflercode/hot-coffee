import React, { Suspense, lazy } from "react";
import {  useSelector, useDispatch } from 'react-redux';

export const CookieDialog = () => {
    const cookies = useSelector((state) => state.cookie);

    if(cookies?.hasAccepted) {
        return;
   // } else if(cookies?.shouldShow) {
       // return<Snackbar>
      //     <SnackBarTitle>

      //     </SnackBarTitle>
      //     <SnackbarContent>

      //     </SnackbarContent>
      //     <SnackbarPositiveButton>

      //     </SnackbarPositiveButton>
      // </Snackbar>
   //}
    }

    return;
}