import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { setCurrentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={props => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                setCurrentUser(currentUser);
                if (currentUser) {
                    return (<Component {...props} />);
                } else {
                    return (<Redirect to={{ pathname: "/login", state: { referer: props.location } }} />)
                }
            }}
        />
    );
}

export default PrivateRoute;