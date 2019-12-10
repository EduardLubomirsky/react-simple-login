import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForms';

function Signup() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");

    function registerUser() {
        if (userName && password && repeatPassword) {
            const user = {
                userName,
                password,
            }
            let users = localStorage.getItem('users');
            if (!users) {
                users = [];
            } else {
                users = JSON.parse(users);
            }
            const userCandidate = users.find(x => x.userName === userName);

            if (!userCandidate && password === repeatPassword) {
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(user));
                setLoggedIn(true);
            } else {
                setMessage('User already exist or password did not match!');
            }
        } else {
            setMessage('All fields are required!');
        }
    }

    if (isLoggedIn) {
        return <Redirect to="/admin" />;
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
                <Input
                    type="password"
                    placeholder="password again"
                    value={repeatPassword}
                    onChange={e => {
                        setRepeatPassword(e.target.value);
                    }}
                />
                <Button onClick={registerUser}>Sign Up</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
            {message && <Error>{message}</Error>}
        </Card>
    );
}

export default Signup;