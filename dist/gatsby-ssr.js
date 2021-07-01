import React from "react"

export const onRenderBody = ({setHeadComponents}, pluginOptions) => {
    const {googleAnalyticsTrackingID, facebookPixelId, googleReCaptchaSiteKey} = pluginOptions ?? {googleAnalyticsTrackingID: false, googleReCaptchaSiteKey: false, facebookPixelId: false}

    if (googleAnalyticsTrackingID) {
        const src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingID}`;
        const config = `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());        
             gtag('config', '${googleAnalyticsTrackingID}', {
                send_page_view: false
             });`;
        setHeadComponents(<script key={"analytics-script"} src={src}/>)
        setHeadComponents(<script key={"analytics-config"} dangerouslySetInnerHTML={{__html: config}}/>)
    }

    if (googleReCaptchaSiteKey) {
        const src = `https://www.google.com/recaptcha/api.js?render=${googleReCaptchaSiteKey}`;
        setHeadComponents(<script key={"recaptcha-script"} src={src}/>)
    }

    if (facebookPixelId) {
        const script = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${facebookPixelId}');
            fbq( "track", "PageView" );
            `;
        setHeadComponents(<script key={"facebook-pixel"} dangerouslySetInnerHTML={{__html: script}}/>)
    }
};
