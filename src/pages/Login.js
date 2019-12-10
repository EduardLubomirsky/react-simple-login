
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const referer = (props.location.state && props.location.state.referer) || '/admin';

    function postLogin() {
        let users = localStorage.getItem('users');
        if (!users) {
            users = [];
        } else {
            users = JSON.parse(users);
        }

        const findedUser = users.find((x) => {
            if(x.password === password && userName === x.userName) {
                return x;
            }
        })

        if(!findedUser) {
            setIsError(true);
        } else {
            localStorage.setItem('currentUser', JSON.stringify(findedUser));
            setLoggedIn(true);
        }
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input
                    type="email"
                    placeholder="email"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                />
                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            {isError && <Error>The username or password provided were incorrect!</Error>}
        </Card>
    );
}

export default Login;