import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { authSelector } from "../../selectors/authState";
import { gameActionCreated } from "../../store/reducers/game-actions-reducer";
import { GAME_CREATED, GAME_UPDATED } from "../../store/reducers/game-reducer";
import {
    potRequestCreated,
    potRequestUpdated
} from "../../store/reducers/pot-request";

function setUpMarkerWorld(authToken) {
    const socket = io(process.env.REACT_APP_MARKERWORLD_SOCKET_HOST, {
        path: "/markerworld/socket",
        auth: {
            token: authToken
        }
    });

    return socket;
}

function setUpChippie(authToken) {
    const socket = io(process.env.REACT_APP_CHIPPIE_SOCKET_HOST, {
        path: "/chippie/socket",
        auth: {
            token: authToken
        }
    });

    return socket;
}

function handleEventsMarkerWorld(socket, dispatch) {
    socket.on("connect", () => {
        console.log("connected to markerworld");
    });

    socket.on("disconnect", () => {
        console.log("disconneted from markerworld");
    });

    socket.on("player-added", (player) => {
        dispatch({ type: "PLAYER_JOINED", player });
    });

    socket.on("player-removed", (playerId) => {
        dispatch({ type: "PLAYER_REMOVED", playerId });
    });

    socket.on("player-name-change", (player) => {
        dispatch({ type: "PLAYER_NAME_CHANGE", player });
    });
}

function handleEventsChippie(socket, dispatch) {
    socket.on("connect", () => {
        console.log("connected to chippie");
    });

    socket.on("disconnect", () => {
        console.log("disconneted from chippie");
    });

    socket.on("game-created", (game) => {
        dispatch({ type: GAME_CREATED, game });
    });

    socket.on("game-updated", (game) => {
        dispatch({ type: GAME_UPDATED, game });
    });

    socket.on("action-created", (action) => {
        dispatch(gameActionCreated(action));
    });

    socket.on("pot-request-created", (potRequest) => {
        dispatch(potRequestCreated(potRequest));
    });

    socket.on("pot-request-updated", (potRequest) => {
        dispatch(potRequestUpdated(potRequest));
    });
}

const Socket = () => {
    const dispatch = useDispatch();
    const authState = useSelector(authSelector);

    useEffect(() => {
        if (!authState.authToken.token) return;

        console.log("setting up socket..");
        const socketMarkerWorld = setUpMarkerWorld(authState.authToken.token);
        handleEventsMarkerWorld(socketMarkerWorld, dispatch);

        const socketChippie = setUpChippie(authState.authToken.token);
        handleEventsChippie(socketChippie, dispatch);

        return () => {
            console.log("Disconnecting socket.");
            socketMarkerWorld.disconnect();
            socketChippie.disconnect();
        };
    }, [authState.authToken, dispatch]);

    return null;
};

export default Socket;
