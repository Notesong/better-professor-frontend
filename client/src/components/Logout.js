import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

export const Logout = () => {
    const { loggedIn, toggleLoggedIn } = useContext(GlobalContext);

    // logout function that clears local storage and returns user to the login form
    function logout(e) {
        e.preventDefault();
        localStorage.clear();
        toggleLoggedIn();
        window.location.href = '/';
    }
    return (
        <>
            {/* Only logout show button if logged in */}
            {!loggedIn ? '' : <button onClick={logout}>Logout</button> }
        </>
    )
}

