import tokenService from "../../services/token-service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Worker from "../../worker/auth.worker.js";

const hasTokenExpired = (token) => {
    const expiresAtAsDate = new Date(token.expiresAt);
    return expiresAtAsDate.getTime() <= Date.now();
};

async function refreshAuthToken(refreshToken, dispatch) {
    const authResp = await tokenService.refreshToken(refreshToken);
    dispatch({ type: "CREATE_AUTH_TOKEN", authToken: authResp.data });
}

const isValidToken = (token) => token.token && !hasTokenExpired(token);

const AuthController = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        let worker;
        if (isValidToken(authState.refreshToken)) {
            if (!isValidToken(authState.authToken)) {
                refreshAuthToken(authState.refreshToken.token, dispatch);
                return;
            }

            worker = new Worker();
            const authTokenExpiresAtMs =
                new Date(authState.authToken.expiresAt).getTime() -
                Date.now() -
                30000;

            worker.postMessage(authTokenExpiresAtMs);
            worker.onmessage = function (_) {
                console.log("Expired .. refreshing ");
                refreshAuthToken(authState.refreshToken.token, dispatch);
            };
        }

        return () => {
            if (worker) {
                console.log("Terminating worker");
                worker.terminate();
            }
        };
    }, [authState, dispatch]);

    return null;
};

export default AuthController;
