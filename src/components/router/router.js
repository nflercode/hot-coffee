import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spinner } from "../spinner/spinner";
import {StartPage} from "../../pages/start-page/start-page";
const CreatePage = lazy(() => import("../../pages/create-page"));
const JoinPage = lazy(() => import("../../pages/join-page"));

export const Router = () => {
    const routes = 
        [
            {
                path: "/",
                exact: true,
                component: StartPage,
            },
            {
                path: "/create",
                exact: true,
                component: CreatePage,
            },
            {
                path: "/join",
                exact: true,
                component: JoinPage,
            },
            {
                path: "/table",
                exact: true,
                component: StartPage,
            }
        ];

    return (
        <BrowserRouter>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    {routes.map((item, i) => <Route component={item.component} path={item.path} exact={item.exact} key={i} />)}
                    <Route component={() => <div>Det du försökte hitta hittades inte.</div>} />
                </Switch>
            </Suspense>
        </BrowserRouter>
        );
};