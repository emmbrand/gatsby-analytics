# gatsby-source-firestore

Gatsby plugin to add Analytics to your site.

## Usage

1. ```npm install emmbrand-gatsby-analytics```
3. Configure settings at ```gatsby-config.js```, for example:

```node
module.exports = {
    plugins: [
        // ... Other plugins
        {
            resolve: "emmbrand-gatsby-analytics",
            options: {
                facebookPixelId: "YOUR_FACEBOOK_PIXEL_ID",
                googleAnalyticsTrackingID: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
                googleReCaptchaSiteKey: "YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
            }
        }
    ]
}
```

Then use CookiesBanner Component to manage your cookies.

```jsx
export const wrapPageElement = ({element, props}) => {
    return (
        <>
            <CookiesBanner
                //This will be shown when the user takes action to the main banner
                dismissedChildren={({acceptAllCookies, declineAllCookies}) =>
                    <div>...</div>
                }
            >
                {({acceptAllCookies, declineAllCookies, dismissBanner}) => (
                    <div>...</div>
                )}
            </CookiesBanner>
            {element}
        </>
    )
}
```

