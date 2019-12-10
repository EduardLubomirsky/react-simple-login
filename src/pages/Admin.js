import React from 'react';
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Admin() {
    const { setCurrentUser } = useAuth();
    function logOut() {
        setCurrentUser();
        localStorage.removeItem('currentUser');
    }

    return (
        <div>
            <div>Admin Page</div>
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
}

export default Admin;