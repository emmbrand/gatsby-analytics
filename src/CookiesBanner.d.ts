import { FC, ReactElement } from "react";
declare type CookiesBannerChildrenProps = {
    acceptAllCookies: () => void;
    declineAllCookies: () => void;
    dismissBanner: () => void;
};
interface ICookiesBanner {
    children: ({ acceptAllCookies, declineAllCookies, dismissBanner }: CookiesBannerChildrenProps) => ReactElement<any, any> | null;
    dismissedChildren: ({ acceptAllCookies, declineAllCookies }: Omit<CookiesBannerChildrenProps, "dismissBanner">) => ReactElement<any, any> | null;
}
declare const CookiesBanner: FC<ICookiesBanner>;
export default CookiesBanner;
