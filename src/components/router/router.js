import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Spinner } from "../spinner/spinner";
import { StartPage } from "../../pages/start-page/start-page";

const CreatePage = lazy(() => import("../../pages/create-page/create-page"));
const JoinPage = lazy(() => import("../../pages/join-page/join-page"));
const LobbyPage = lazy(() => import("../../pages/lobby-page/lobby-page"));
const GamePage = lazy(() => import("../../pages/game-page/game-page"));

const GaWrapper = ({ children }) => {
    const history = useHistory();
    useEffect(() => {
        history.listen(() => {
            window.gtag("event", "page_view", {
                page_title: `${history.location.pathname}`,
                page_location: `${history.location.pathname}?${history.location.search}`,
                page_path: history.location.pathname,
                send_to: "G-CB0MNTR2X8"
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

    // Note that the browser router is not so friendly to unit test,
    // if we want to test the router component we should mock it away and use historyRouter instead
    // It may be a good idea to move away from browser to history router instead.
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
