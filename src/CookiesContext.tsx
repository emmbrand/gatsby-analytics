import * as React from "react"
import { Dispatch, FunctionComponent, memo, SetStateAction, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export type TypeCookies = {
    cookiesConsent: "true" | "false"
    closeBanner?: boolean
    setCookies?: Dispatch<SetStateAction<any>>
}

export const CookiesContext = React.createContext<TypeCookies>( {
    cookiesConsent: "false",
    closeBanner   : false

} );

export const CookiesContextProvider: FunctionComponent = memo( ( { children } ) => {
    const cookiesConsentCookie = Cookies.get( 'cookiesConsent' ) ? Cookies.get( 'cookiesConsent' ) : "false";
    const [ cookies, setCookies ] = useState<TypeCookies>( {
        cookiesConsent: "false",
        closeBanner   : false
    } );

    useEffect( () => {
        const shouldShowBanner = sessionStorage.getItem( "closeCookieBanner" ) ?? ""
        setCookies( {
            cookiesConsent: cookiesConsentCookie,
            closeBanner   : shouldShowBanner === "true",
        } );
    }, [] )

    return (
        <CookiesContext.Provider value={ {
            cookiesConsent: cookies.cookiesConsent,
            closeBanner   : cookies.closeBanner,
            setCookies    : setCookies
        } }>
            { children }
        </CookiesContext.Provider>
    )
} )

export function useCookieContext() {
    return useContext( CookiesContext )
}
