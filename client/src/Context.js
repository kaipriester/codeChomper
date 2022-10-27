import React, { createContext, useEffect, useState } from 'react';
import { getUser } from "./client/API";
export const appContext = createContext({});

export default function Context(props) {

    const [userObject, setUserObject] = useState();

    useEffect(async () => {
        var response = await getUser();
        console.log(response);
        setUserObject(response.data);
    }, []);
    return (
        <appContext.Provider value={userObject}>{props.children}</appContext.Provider>
    );
};