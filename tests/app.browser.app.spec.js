describe('Appium', () => {
    it('should be able to automate the app-browser-app interaction', () => {
        /**
         * 1. Open the app
         */
        // Wait for the screen to be displayed: '~test-home-screen'


        // Open the App Browser App screen: '~test-App-Browser-App'


        // Wait for the app browser app screen: '~test-app-browser-app-screen'


        /**
         * 2. Go to the browser and verify that it is opened
         */
        // Open the browser: '~test-Open Browser'


        // Now do all the context magic

        /**
         * Wait until the right context with the right url has loaded
         * This `waitUntil` will wait until the condition of the provided
         * function will return true, in our case it will return true if
         * the `correctWebview` contains a value
         */
        /**
         * `waitUntil` expects a condition and waits until that condition is
         * fulfilled with a truthy value. So just log the contexts for 15 seconds
         */


        // Now switch to the right context and verify the page




        /**
         * 3. Go back to the app
         */
        // Switch back to the native context


        // Make sure the app is not visible: '~test-app-browser-app-screen'


        // Now open the app again 'org.wswebcreation.TheUncommon' : 'com.theuncommon'
        // See http://appium.io/docs/en/commands/device/app/activate-app/


        // Verify that the app-browser-app-screen is shown again '~test-app-browser-app-screen'

    });
});

/**
 * Get the context with their id, title and url for Android
 *
 * @returns {
 *  {
 *      id: 'string',
 *      title: 'string',
 *      url: 'string'
 *  }[]
 * }
 */
function getAndroidContexts() {
    const currentContext = driver.getContext();

    // Get the contexts
    const contexts = driver.getContexts().map(context => {
        let title = '';
        let url = '';
        const id = context;

        if (id !== 'NATIVE_APP') {
            driver.switchContext(context);
            const pageTitle = driver.getTitle();
            url = driver.getUrl();
            title = pageTitle === '' ? 'No page title available' : pageTitle;
        }

        return {
            id: id,
            title: title,
            url: url
        };
    });

    // Set it back to the current context
    driver.switchContext(currentContext);

    return contexts;
}
