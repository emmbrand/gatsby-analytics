import React from "react";
import {CookiesContextProvider} from "./src/CookiesContext";

export const wrapRootElement = ({element}) => {
    return (
        <CookiesContextProvider>
            {element}
        </CookiesContextProvider>
    )
};

