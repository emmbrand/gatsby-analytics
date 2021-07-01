export declare type TypeEventParams = {
    page_title: string;
    page_location: string;
    page_path: string;
    send_to: string;
};
export declare type TypeSendGoogleAnalyticsView = {
    eventParams: TypeEventParams;
    consent: boolean;
    debugDev?: boolean;
};
export declare function sendGoogleAnalyticsView({ eventParams, consent, debugDev }: TypeSendGoogleAnalyticsView): void;
export declare type TypeSendFacebookPixelEvent = {
    eventName: string;
    consent: boolean;
    options?: {};
    debugDev?: boolean;
};
export declare function sendFacebookPixelEvent({ eventName, consent, options, debugDev }: TypeSendFacebookPixelEvent): void;
