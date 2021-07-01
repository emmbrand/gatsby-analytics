import React from "react";
import {CookiesContextProvider} from "./index";

export const wrapRootElement = ({element}) => {
    return (
        <CookiesContextProvider>
            {element}
        </CookiesContextProvider>
    )
};

