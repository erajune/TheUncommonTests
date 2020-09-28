const capabilities = [];

if(process.env.OS !== 'android'){
    capabilities.push({
        // Adjust these capabilities to meet your simulator
        automationName: 'XCUITest',
        deviceName: 'iPhone 11',
        platformName: 'iOS',
        platformVersion: '13.7',
        orientation: 'PORTRAIT',
        includeSafariInWebviews: true,
        app: 'app/ios.simulator.the.uncommon.app.zip',
        noReset: true,
    });
}

if(process.env.OS !== 'ios'){
    capabilities.push({
        // Adjust these capabilities to meet your emulator
        automationName: 'UIAutomator2',
        deviceName: 'Pixel_3_10.0',
        platformName: 'Android',
        platformVersion: '10.0',
        orientation: 'PORTRAIT',
        app: 'app/android.emulator.the.uncommon.app.apk',
        noReset: true,
        appWaitActivity: 'com.theuncommon.MainActivity',
    });
}


exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    // ============
    // Capabilities
    // ============
    maxInstances: 2,
    capabilities: capabilities,

    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './tests/**/*.js',
    ],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'silent',
    baseUrl: 'https://localhost:3000',
    waitforTimeout: 15000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 180000,
        helpers: [require.resolve('@babel/register')],
    },

    // ========
    // Services
    // ========
    // I assume you've install Appium globally, so WebdriverIO can start it automatically
    services: [
        ['appium', {
            // This will use the globally installed Appium
            command: 'appium',
            args: {
                // This will let us automatically download the needed ChromeDriver
                relaxedSecurity: true
            }
        }],
    ],
    port: 4723,
}
