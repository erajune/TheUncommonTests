describe('Appium', () => {
    beforeEach(() => {
        /**
         * 1. Open the app and go to the poll screen
         */
        // Wait for the screen to be displayed
        $('~test-home-screen').waitForDisplayed({
            timeoutMsg: 'Home screen not shown',
            timeout: 15000,
        });

        // Check if the poll button is displayed, if not swipe and search
        searchAndSwipe($('~test-Poll'));

        // Open the poll page and wait for it to be visible
        $('~test-Poll').click();
        $('~test-poll-screen').waitForDisplayed({
            timeoutMsg: 'Poll screen not shown',
            timeout: 15000,
        });
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
         *    else use the just created method for it
         */
        searchAndSwipe($('~test-dragMe-1'));

        /**
         * 3. Execute the drag magic
         */

        // Determine the position of the dropzone and the drag element
        const dropZoneRec = driver.getElementRect($('~test-dropZone').elementId);
        const dragMe1Rec = driver.getElementRect($('~test-dragMe-1').elementId);

        // See http://appium.io/docs/en/commands/interactions/actions/#actions
        driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: {pointerType: 'touch'},
            actions: [
                // Pick the center of the draggable element
                {
                    type: 'pointerMove',
                    duration: 0,
                    x: dragMe1Rec.x + dragMe1Rec.width / 2,
                    y: dragMe1Rec.y + dragMe1Rec.height / 2
                },
                {type: 'pointerDown', button: 0},
                {type: 'pause', duration: 1000},
                // Move it to the center of the drop zone
                {
                    type: 'pointerMove',
                    duration: 250,
                    x: dropZoneRec.x + dropZoneRec.width / 2,
                    y: dropZoneRec.y + dropZoneRec.height / 2
                },
                {type: 'pointerUp', button: 0}
            ]
        }]);
        // Wait 1 second for the animation to be gone
        driver.pause(1000);

        expect($('~test-dragMe-1').isDisplayed()).toBeFalsy();

        // // Or for all
        // [$('~test-dragMe-1'), $('~test-dragMe-2'),$('~test-dragMe-3'),$('~test-dragMe-4')].forEach(dragEl =>{
        //     dragAndDrop($(`~test-dropZone`), dragEl);
        //     // Wait 1 second for the animation to be gone
        //     driver.pause(1000);
        //     expect(dragEl.isDisplayed()).toBeFalsy();
        // });
    });

    it('should be able to automate pinch/zoom', () => {
        /**
         * 2. Check if the element is visible that we want to interact with
         *    else use the just created method for it
         */
        searchAndSwipe($('~test-pinchZoomImage'));

        // For demo purpose only
        driver.pause(2000);

        /**
         * 3. Get the rectangles of the element
         */

        // // The easy way or iOS,
        // // see http://appium.io/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures/#mobile-pinch
        // driver.execute('mobile: pinch', {scale: 5, velocity: 1.1, element: $('~test-pinchZoomImage').elementId});

        // The 'hard' way with the Actions API
        const {x, y, width, height} = driver.getElementRect($('~test-pinchZoomImage').elementId);
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        // See http://appium.io/docs/en/commands/interactions/actions/#actions
        driver.performActions([
            // First finger
            {
                type: 'pointer',
                id: 'finger1',
                parameters: {pointerType: 'touch'},
                actions: [
                    // move finger into start position
                    {type: 'pointerMove', duration: 0, x: centerX, y: centerY},
                    // finger comes down into contact with screen
                    {type: 'pointerDown', button: 0},
                    // pause for a little bit
                    {type: 'pause', duration: 100},
                    // finger moves to end position
                    {type: 'pointerMove', duration: 250, x: centerX - width / 2, y: centerY},
                    // finger lets up, off the screen
                    {type: 'pointerUp', button: 0}
                ]
            },
            // Second finger
            {
                type: 'pointer',
                id: 'finger2',
                parameters: {pointerType: 'touch'},
                actions: [
                    // move finger into start position
                    {type: 'pointerMove', duration: 0, x: centerX, y: centerY},
                    // finger comes down into contact with screen
                    {type: 'pointerDown', button: 0},
                    // pause for a little bit
                    {type: 'pause', duration: 100},
                    // finger moves to end position
                    {type: 'pointerMove', duration: 250, x: centerX + width / 2, y: centerY},
                    // finger lets up, off the screen
                    {type: 'pointerUp', button: 0}
                ]
            },
        ]);

        // For demo purpose only
        driver.pause(2000);
    });
});

/**
 * Find an element or else scroll to it
 *
 * @param {Element} element
 *
 * @returns {void}
 */
function searchAndSwipe(element) {
    // Check if the element is visible, else scroll to it
    if (!element.isDisplayed()) {
        const {height, width} = driver.getWindowRect();

        driver.touchPerform([{
            action: 'press',
            options: {x: width / 2, y: height - 100},
        }, {
            action: 'wait',
            options: {ms: 1000},
        }, {
            action: 'moveTo',
            options: {x: width / 2, y: 100},
        }, {
            action: 'release',
        }]);

        // Rerun
        return searchAndSwipe(element);
    }
}

/**
 * Drag an element into a drop zone
 *
 * @param {Element} dropZoneElement
 *
 * @param {Element} dragElement
 */
function dragAndDrop(dropZoneElement, dragElement) {
    const dropZoneRec = driver.getElementRect(dropZoneElement.elementId);
    const dragMeRec = driver.getElementRect(dragElement.elementId);

    driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: {pointerType: 'touch'},
        actions: [
            // Pick the center of the draggable element
            {
                type: 'pointerMove',
                duration: 0,
                x: dragMeRec.x + dragMeRec.width / 2,
                y: dragMeRec.y + dragMeRec.height / 2
            },
            {type: 'pointerDown', button: 0},
            {type: 'pause', duration: 1000},
            // Move it to the center of the drop zone
            {
                type: 'pointerMove',
                duration: 250,
                x: dropZoneRec.x + dropZoneRec.width / 2,
                y: dropZoneRec.y + dropZoneRec.height / 2
            },
            {type: 'pointerUp', button: 0}
        ]
    }]);
    // Wait 1 second for the animation to be gone
    driver.pause(1000);
}
