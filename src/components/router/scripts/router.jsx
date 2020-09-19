import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

//Use React.Lazy to load pages, components can be imported as usual
const HomePage = lazy(() => import("../../../pages/home/scripts/home.jsx"));

export default function Router() {
    const [selected, setSelected] = useState(undefined);

    const onItemClick = name => {
        setSelected(name);
    };

    useEffect(() => {
        setSelected(window.location.pathname);
    }, []);

    const routes = [{
        content: "Hem",
        type: "button",
        linkTo: "/",
        isActive: selected === "/"
    },
    {
        content: "Skapa argument",
        type: "button",
        linkTo: "/skapa-argument",
        isActive: selected === "/skapa-argument"
    },
    {
        content: "Logga in",
        type: "button",
        linkTo: "/logga-in",
        isActive: selected === "/logga-in"
    },
    {
        content: "register",
        type: "button",
        linkTo: "/registera",
        isActive: selected === "/registera"
    }];

    function RouteNotFound() {
        return (
            <h2>404 - Nu vet jag inte vad du letar efter</h2>
        );
    }

    function CreateArgument() {
        return (
            <h2>Skapa ett argument ..</h2>
        );
    }

    function Login() {
        return (
            <h2>Logga in ..</h2>
        );
    }

    function Register() {
        return (
            <h2>Registrera dig ..</h2>
        );
    }

    return (
        <div className="main">
            <BrowserRouter>
                <div className="navigation">
                    <Link
                        onClick={() => {
                            onItemClick("/");
                        }}
                        to={"/"}
                        key={"/"}
                    >
                        Nfler
                    </Link>
                    {routes.map((route) => (
                        <Link onClick={() => {
                            onItemClick(route.linkTo);
                        }}
                            to={route.linkTo}
                            key={route.linkTo}
                        >
                            {route.content}
                        </Link>
                    )
                    )}
                </div>
                <Suspense fallback={<div>Laddar..</div>}>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/skapa-argument" exact component={CreateArgument} />
                        <Route path="/logga-in" exact component={Login} />
                        <Route path="/registera" exact component={Register} />
                        <Route component={RouteNotFound} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}