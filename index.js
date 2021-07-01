'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Cookies = require('js-cookie');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);

var CookiesContext = React__default['default'].createContext({
    cookiesConsent: "false",
    closeBanner: false,
    setCookies: function () {
    }
});
var CookiesContextProvider = React.memo(function (_a) {
    var _b;
    var children = _a.children;
    var cookiesConsentCookie = (_b = Cookies__default['default'].get('cookiesConsent')) !== null && _b !== void 0 ? _b : "false";
    var _c = React.useState({
        cookiesConsent: "false",
        closeBanner: false,
    }), cookies = _c[0], setCookies = _c[1];
    React.useEffect(function () {
        var _a;
        var shouldShowBanner = (_a = sessionStorage.getItem("closeCookieBanner")) !== null && _a !== void 0 ? _a : "";
        setCookies({
            cookiesConsent: cookiesConsentCookie,
            closeBanner: shouldShowBanner === "true",
        });
    }, []);
    return (React__default['default'].createElement(CookiesContext.Provider, { value: {
            cookiesConsent: cookies.cookiesConsent,
            closeBanner: cookies.closeBanner,
            setCookies: setCookies
        } }, children));
});
function useCookieContext() {
    return React.useContext(CookiesContext);
}

var CookiesBanner = function (_a) {
    var children = _a.children, _b = _a.dismissedChildren, dismissedChildren = _b === void 0 ? null : _b;
    var _c = React.useState(false), mounted = _c[0], setMounted = _c[1];
    var _d = useCookieContext(), cookiesConsent = _d.cookiesConsent, closeBanner = _d.closeBanner, setCookies = _d.setCookies;
    React.useEffect(function () {
        setMounted(true);
    }, []);
    function acceptAllCookies() {
        Cookies__default['default'].set('cookiesConsent', "true", { expires: 30 });
        setCookies({
            cookiesConsent: "true",
            closeBanner: true
        });
    }
    function declineAllCookies() {
        Cookies__default['default'].set('cookiesConsent', "false", { expires: 30 });
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

exports.CookiesBanner = CookiesBanner;
exports.CookiesContextProvider = CookiesContextProvider;
exports.sendFacebookPixelEvent = sendFacebookPixelEvent;
exports.sendGoogleAnalyticsView = sendGoogleAnalyticsView;
exports.useCookieContext = useCookieContext;
//# sourceMappingURL=index.js.map
