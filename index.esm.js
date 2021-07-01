import React, { memo, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

var CookiesContext = React.createContext({
    cookiesConsent: "false",
    closeBanner: false,
    setCookies: function () {
    }
});
var CookiesContextProvider = memo(function (_a) {
    var _b;
    var children = _a.children;
    var cookiesConsentCookie = (_b = Cookies.get('cookiesConsent')) !== null && _b !== void 0 ? _b : "false";
    var _c = useState({
        cookiesConsent: "false",
        closeBanner: false,
    }), cookies = _c[0], setCookies = _c[1];
    useEffect(function () {
        var _a;
        var shouldShowBanner = (_a = sessionStorage.getItem("closeCookieBanner")) !== null && _a !== void 0 ? _a : "";
        setCookies({
            cookiesConsent: cookiesConsentCookie,
            closeBanner: shouldShowBanner === "true",
        });
    }, []);
    return (React.createElement(CookiesContext.Provider, { value: {
            cookiesConsent: cookies.cookiesConsent,
            closeBanner: cookies.closeBanner,
            setCookies: setCookies
        } }, children));
});
function useCookieContext() {
    return useContext(CookiesContext);
}

var CookiesBanner = function (_a) {
    var children = _a.children, dismissedChildren = _a.dismissedChildren;
    var _b = useState(false), mounted = _b[0], setMounted = _b[1];
    var _c = useCookieContext(), cookiesConsent = _c.cookiesConsent, closeBanner = _c.closeBanner, setCookies = _c.setCookies;
    useEffect(function () {
        setMounted(true);
    }, []);
    function acceptAllCookies() {
        Cookies.set('cookiesConsent', "true", { expires: 30 });
        setCookies({
            cookiesConsent: "true",
            closeBanner: true
        });
    }
    function declineAllCookies() {
        Cookies.set('cookiesConsent', "false", { expires: 30 });
        sessionStorage.setItem("closeCookieBanner", "true");
        setCookies({
            cookiesConsent: "false",
            closeBanner: true
        });
    }
    function dismissBanner() {
        sessionStorage.setItem("closeCookieBanner", "true");
        setCookies({
            cookiesConsent: "false",
            closeBanner: true
        });
    }
    if (!mounted) {
        return null;
    }
    if (cookiesConsent === "true" || closeBanner) {
        return dismissedChildren && dismissedChildren({ acceptAllCookies: acceptAllCookies, declineAllCookies: declineAllCookies });
    }
    return (children({ acceptAllCookies: acceptAllCookies, declineAllCookies: declineAllCookies, dismissBanner: dismissBanner }));
};

function sendGoogleAnalyticsView(_a) {
    var eventParams = _a.eventParams, consent = _a.consent, debugDev = _a.debugDev;
    var isDev = process.env.NODE_ENV === 'development' && debugDev;
    if (!consent) {
        isDev && console.log("You don't have consent");
        return;
    }
    if (isDev) {
        console.log({
            "Analytics view": eventParams
        });
        return;
    }
    if (typeof gtag !== "function")
        return;
    gtag('event', 'page_view', eventParams);
}
function sendFacebookPixelEvent(_a) {
    var eventName = _a.eventName, consent = _a.consent, _b = _a.options, options = _b === void 0 ? {} : _b, debugDev = _a.debugDev;
    var isDev = process.env.NODE_ENV === 'development' && debugDev;
    if (!consent) {
        isDev && console.log("You don't have consent");
        return;
    }
    if (isDev) {
        console.log("Facebook PageView sent!");
        return;
    }
    if (typeof fbq !== "function")
        return;
    fbq('consent', 'grant');
    fbq("track", eventName, options);
}

export { CookiesBanner as CookieBanner, CookiesContextProvider, sendFacebookPixelEvent, sendGoogleAnalyticsView, useCookieContext };
//# sourceMappingURL=index.esm.js.map
