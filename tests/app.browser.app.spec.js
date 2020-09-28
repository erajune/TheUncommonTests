describe('Appium', () => {
    it('should be able to automate the app-browser-app interaction', () => {
        /**
         * 1. Open the app
         */
        // Wait for the screen to be displayed
        $('~test-home-screen').waitForDisplayed();

        // Open the App Browser App screen
        $('~test-App-Browser-App').click();

        // Wait for the app browser app screen
        $('~test-app-browser-app-screen').waitForDisplayed();

        /**
         * 2. Go to the browser and verify that it is opened
         */
        // Open the browser
        $('~test-Open Browser').click();

        // Now do all the context magic
        let correctWebview = null;
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
        driver.waitUntil(() => {
            // Get all the contexts, that could look like this
            // [
            //     {
            //         id: 'NATIVE_APP'
            //     },
            //     {
            //         id: 'WEBVIEW_74323.1',
            //         title: 'Automate the uncommon with Appium – part 1 « Romania Testing Conference',
            //         url: 'https://romaniatesting.ro/sessions/automate-the-uncommon-with-appium-part-1/',
            //         bundleId: 'com.apple.mobilesafari'
            //     },
            //  ]
            // See http://appium.io/docs/en/commands/mobile-command/
            const contexts = driver.isIOS ? driver.execute('mobile:getContexts') : getAndroidContexts();

            // Just to see the logs in your terminal
            console.log('contexts = ', contexts)

            // Store the correct context into this variable
            // if there is no match don't do anything
            correctWebview = contexts
                // First filter out the 'NATIVE_APP'
                .filter(context => {
                    return !context.id.includes('NATIVE_APP')
                })
                // Now filter out the webview that contains the correct URL
                .find(context => {
                    return context.url.includes('https://romaniatesting.ro/')
                });

            // If the `correctWebview` contains a value this function will evaluate to `true` meaning
            // the `waitUntil` can stop
            return correctWebview || false;
        }, {timeout: 15000});

        // Now switch to the right context and verify the page
        driver.switchContext(correctWebview.id);

        expect(driver.getTitle()).toEqual('Track 2 – Automate the uncommon with Appium – part 1 « Romania Testing Conference');

        /**
         * 3. Go back to the app
         */
        // Switch back to the native context
        driver.switchContext('NATIVE_APP');

        // Make sure the app is not visible
        expect($('~test-app-browser-app-screen').isDisplayed()).toEqual(false);

        // Now open the app again
        // See http://appium.io/docs/en/commands/device/app/activate-app/
        driver.activateApp(driver.isIOS ? 'org.wswebcreation.TheUncommon' : 'com.theuncommon');

        // Verify that the app-browser-app-screen is shown again
        $('~test-app-browser-app-screen').waitForDisplayed();
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
