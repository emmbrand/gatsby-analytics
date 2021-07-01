export type TypeEventParams = {
    page_title: string
    page_location: string
    page_path: string
    send_to: string
}

export type TypeSendGoogleAnalyticsView = {
    eventParams: TypeEventParams
    consent: boolean
    debugDev?: boolean
}

export function sendGoogleAnalyticsView( { eventParams, consent, debugDev }: TypeSendGoogleAnalyticsView ) {
    const isDev = process.env.NODE_ENV === 'development' && debugDev;
    if (!consent) {
        isDev && console.log( "You don't have consent" )
        return
    }
    if (isDev) {
        console.log( {
            "Analytics view": eventParams
        } )
        return;
    }
    if (typeof gtag !== "function") return;
    gtag( 'event', 'page_view', eventParams )
}

export type TypeSendFacebookPixelEvent = {
    eventName: string
    consent: boolean
    options?: {}
    debugDev?: boolean
}

export function sendFacebookPixelEvent( { eventName, consent, options = {}, debugDev }: TypeSendFacebookPixelEvent ) {
    const isDev = process.env.NODE_ENV === 'development' && debugDev;
    if (!consent) {
        isDev && console.log( "You don't have consent" )
        return
    }
    if (isDev) {
        console.log( "Facebook PageView sent!" )
        return;
    }
    if (typeof fbq !== "function") return;
    fbq( 'consent', 'grant' )
    fbq( "track", eventName, options )
}
