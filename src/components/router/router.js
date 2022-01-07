import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Spinner } from "../spinner/spinner";
import { StartPage } from "../../pages/start-page/start-page";

//const StartPage = import("../../pages/start-page/start-page");
const CreatePage = lazy(() => import("../../pages/create-page/create-page"));
const JoinPage = lazy(() => import("../../pages/join-page/join-page"));
const LobbyPage = lazy(() => import("../../pages/lobby-page/lobby-page"));
const GamePage = lazy(() => import("../../pages/game-page/game-page"));

const GaWrapper = ({ children }) => {
    const history = useHistory();
    useEffect(() => {
        history.listen(() => {
            window.gtag("event", "page_view", {
                page_title: `${history.location.pathname}?${history.location.search}`,
                page_location:
                    history.location.pathname + history.location.search,
                page_path: history.location.pathname,
                send_to: "<GA_MEASUREMENT_ID>"
            });
        });
    }, []);
    return children;
};

export const Router = () => {
    const routes = [
        {
            path: "/",
            exact: true,
            component: StartPage
        },
        {
            path: "/create",
            exact: true,
            component: CreatePage
        },
        {
            path: "/join/:invitationToken",
            exact: true,
            component: JoinPage
        },
        {
            path: "/table",
            exact: true,
            component: StartPage
        },
        {
            path: "/lobby",
            exact: true,
            component: LobbyPage
        },
        {
            path: "/game",
            exact: true,
            component: GamePage
        }
    ];

    return (
        <BrowserRouter>
            <GaWrapper>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        {routes.map((item, i) => (
                            <Route
                                key={item.path}
                                component={item.component}
                                path={item.path}
                                exact={item.exact}
                            />
                        ))}
                        <Route
                            component={() => (
                                <div>
                                    We could not find what you were looking for
                                </div>
                            )}
                        />
                    </Switch>
                </Suspense>
            </GaWrapper>
        </BrowserRouter>
    );
};
