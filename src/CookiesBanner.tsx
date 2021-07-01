import React, { FC, ReactElement, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useCookieContext } from "./CookiesContext";

type CookiesBannerChildrenProps = {
    acceptAllCookies: () => void
    declineAllCookies: () => void
    dismissBanner: () => void
}

interface ICookiesBanner {
    children: ( { acceptAllCookies, declineAllCookies, dismissBanner }: CookiesBannerChildrenProps ) => ReactElement<any, any> | null
    dismissedChildren: ( { acceptAllCookies, declineAllCookies }: Omit<CookiesBannerChildrenProps, "dismissBanner"> ) => ReactElement<any, any> | null
}

const CookiesBanner: FC<ICookiesBanner> = ( { children, dismissedChildren } ) => {
    const [ mounted, setMounted ] = useState( false );
    const { cookiesConsent, closeBanner, setCookies } = useCookieContext()

    useEffect( () => {
        setMounted( true )
    }, [] )

    function acceptAllCookies() {
        Cookies.set( 'cookiesConsent', "true", { expires: 30 } );
        setCookies( {
            cookiesConsent: "true",
            closeBanner   : true
        } )
    }

    function declineAllCookies() {
        Cookies.set( 'cookiesConsent', "false", { expires: 30 } );
        sessionStorage.setItem( "closeCookieBanner", "true" )
        setCookies( {
            cookiesConsent: "false",
            closeBanner   : true
        } )
    }

    function dismissBanner() {
        sessionStorage.setItem( "closeCookieBanner", "true" )
        setCookies( {
            cookiesConsent: "false",
            closeBanner   : true
        } )
    }

    if (!mounted) {
        return null
    }

    if (cookiesConsent === "true" || closeBanner) {
        return dismissedChildren && dismissedChildren( { acceptAllCookies, declineAllCookies } )
    }

    return (
        children( { acceptAllCookies, declineAllCookies, dismissBanner } )
    )
}

export default CookiesBanner
