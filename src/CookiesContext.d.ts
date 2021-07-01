import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
export declare type TypeCookies = {
    cookiesConsent: "true" | "false";
    closeBanner?: boolean;
    setCookies: Dispatch<SetStateAction<any>>;
};
export declare const CookiesContext: React.Context<TypeCookies>;
export declare const CookiesContextProvider: FunctionComponent;
export declare function useCookieContext(): TypeCookies;
