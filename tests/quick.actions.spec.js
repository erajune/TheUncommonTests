describe('Appium', () => {
    it('should be able to automate the quick actions menu', () => {
        /**
         * 1. Go to the home screen and wait for shown
         *    The assumption is made that you already have the iOS and
         *    or Android app added to the home screen
         */
        // Go to home
        driver.background(-1);
        // Check icon is shown
        $('~TheUncommon').waitForDisplayed({timeout: 15000});

        /**
         * 2. Open the quick actions menu, wait for it to be shown and select an option
         */
        driver.touchPerform([
            {
                action: 'press',
                options: {
                    element: $('~TheUncommon').elementId,
                },
            },
            {
                action: 'wait',
                options: {ms: 2000},
            },
            {
                action: 'release',
            },
        ]);
        // // Open the menu by using the Actions API
        // const {x, y, height, width} = driver.getElementRect($('~TheUncommon').elementId);
        // driver.performActions([{
        //     type: 'pointer',
        //     id: 'finger1',
        //     parameters: {pointerType: 'touch'},
        //     actions: [
        //         {type: 'pointerMove', duration: 0, x: x + width/2, y: y + height/2},
        //         {type: 'pointerDown', button: 0},
        //         {type: 'pause', duration: 2000},
        //         {type: 'pointerMove', duration: 0, x: x + width/2, y: y + height/2},
        //         {type: 'pointerUp', button: 0}
        //     ]
        // }]);

        // Android and iOS have a different selector, so determine it here
        const quickActionsSelector = driver.isIOS
            ? '~Open Quick Actions, Open the Quick Actions page'
            : '~Open Quick Actions';
        // Wait for the 3D menu is opened
        $(quickActionsSelector).waitForDisplayed({
            timeoutMsg: '3D Touch menu did not open',
            timeout: 15000,
        });

        // Open the Quick Actions page
        $(quickActionsSelector).click();


        /**
         * 3. Wait for the page to be shown
         */
        $('~test-quick-actions-screen').waitForDisplayed({
            timeoutMsg: 'Quick Actions page not shown',
            timeout: 15000,
        });

    });
});
