import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../styles/router.css";
import Navigation from  "../../navigation/scripts/navigation.jsx"
import NavigationItem from  "../../navigation/scripts/nav-item.jsx";

//Use React.Lazy to load pages, components can be imported as usual
const HomePage = lazy(() => import("../../../pages/home/scripts/home.jsx"));
const NotFound = lazy(() => import("../../../pages/not-found/scripts/not-found.jsx"));
const LoginPage = lazy(() => import("../../../pages/loginregister/containers/login-user.js"));
const RegisterPage = lazy(() => import("../../../pages/loginregister/containers/create-user.js"));

export default function Router() {
    const [selected, setSelected] = useState(undefined);

    const onItemClick = name => {
        setSelected(name);
    };

    useEffect(() => {
        setSelected(window.location.pathname);
    }, []);

    const routes = [
    {
        content: "Logga in",
        type: "button",
        linkTo: "/logga-in",
        isActive: selected === "/logga-in"
    },
    {
        content: "Registrera",
        type: "button",
        linkTo: "/registrera",
        isActive: selected === "/registrera"
    }];

    function CreateArgument() {
        return (
            <h2>Skapa ett argument ..</h2>
        );
    }

    return (
        <div className="main">
            <BrowserRouter>
                <Navigation>
                    <Link
                        onClick={() => {
                            onItemClick("/");
                        }}
                        to={"/"}
                        key={"/"}
                    >
                        <NavigationItem logo>
                        <h1 className="fc-blue">
                            Nfler
                        </h1>
                        </NavigationItem>
                    </Link>
                    {routes.map((route) => (
                        <Link onClick={() => {
                            onItemClick(route.linkTo);
                        }}
                            to={route.linkTo}
                            key={route.linkTo}
                        >
                            <NavigationItem isActive={route.isActive}>
                                {route.content}
                            </NavigationItem>
                        </Link>
                    )
                    )}
                </Navigation>
                <div className="content-area">    
                    <Suspense fallback={<div>Laddar..</div>}>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/skapa-argument" exact component={CreateArgument} />
                            <Route path="/logga-in" exact component={LoginPage} />
                            <Route path="/registrera" exact component={RegisterPage} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </div>
    )
}