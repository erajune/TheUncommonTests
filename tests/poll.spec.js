describe('Appium', () => {
    beforeEach(() => {
        /**
         * 1. Open the app and go to the poll screen
         */
        // Wait for the screen to be displayed: ~test-home-screen'


        // Check if the poll button is displayed, if not swipe and search: '~test-Poll'


        // Open the poll page and wait for it to be visible: '~test-Poll' '~test-poll-screen'

    });

    afterEach(() => {
        // Clean up after each test so we start in a clean state of the app
        // This can be done smarter but it's not part of the live coding session =)
        driver.closeApp();
        driver.launchApp();
    })

    it('should be able to automate drag/drop', () => {
        /**
         * 2. Check if the element is visible that we want to interact with
         *    else use the just created method for it: '~test-dragMe-1'
         */


        /**
         * 3. Execute the drag magic
         */

        // Determine the position of the dropzone and the drag element


        // See http://appium.io/docs/en/commands/interactions/actions/#actions

        // Wait 1 second for the animation to be gone
        driver.pause(1000);


        // // Or for all
    });

    it('should be able to automate pinch/zoom', () => {
        /**
         * 2. Check if the element is visible that we want to interact with
         *    else use the just created method for it: '~test-pinchZoomImage'
         */


        // For demo purpose only
        driver.pause(2000);

        /**
         * 3. Get the rectangles of the element
         */

        // // The easy way or iOS,
        // // see http://appium.io/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures/#mobile-pinch


        // The 'hard' way with the Actions API


        // See http://appium.io/docs/en/commands/interactions/actions/#actions


        // For demo purpose only
        driver.pause(2000);
    });
});
