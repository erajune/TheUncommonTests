# Automate The Uncommon With Appium

This project will hold all test example that have been shown during the live Coding session of *Automate The Uncommon With Appium* on the 1st of October 2020.

## The Dependencies
This project is using the following dependencies:
- Android emulators
- iOS Simulators
- Node.js
- Appium
- Appium Desktop
- WebdriverIO

I'll not explain all dependencies in detail here, just how or where to download them. Google will be your friend for the rest of your questions ;-). 

### Android Emulators
You need to have Android Studio installed to create one or multiple emulators. Download it from [here](https://developer.android.com/studio#Requirements) and follow the instructions.

### iOS Simulators
You need to have a Mac to be able to download XCODE. When you've installed it you can start your own simulators.

### Node.js
You’ll need [Node.js](https://nodejs.org/en/) installed.

- Install at least v12.16.1 or higher as this is the oldest active LTS version
- Only releases that are or will become an LTS release are officially supported

If you don't have Node installed, we recommend installing [NVM](https://github.com/nvm-sh/nvm) to assist managing multiple active Node.js versions.

### Appium
You can find more information on how to install Appium [here](https://github.com/appium/appium/blob/master/docs/en/about-appium/getting-started.md).
Just follow the installation steps, not the steps for writing your first test because that will be done with WebdriverIO.

### Appium Desktop
Appium Desktop is the same as Appium, only with a beautiful and flexible UI around it. You can download it [here](https://github.com/appium/appium-desktop). Check the documentation on how to use it.

### WebdriverIO
You don't need to install WebdriverIO yourself, just check [Setup the project](#setup-the-project).

## Setup the project
- Clone this project with
        
        git clone https://github.com/wswebcreation/TheUncommonTests.git
    
- Go to the directory

        cd TheUncommonTests
    
- Install all dependencies

        npm install
        
Congratulations, you're done!!!

## 01-app-browser-app
You now checked out the `01-app-browser-app`-branch. You can see a [wdio.conf.js](./wdio.conf.js)-file in the root of the 
project with the capabilities at the top of the file. Make sure you have those configurations on your machine, if not just change them
in this file.

The code of the test which has been used for the demo can be found [here](./tests/app.browser.app.spec.js).

If you want to run the `app-browser-app`-tests on both devices just run

    npm run test.app.browser.app
    
If you want to run it only on the Android device run

    OS=android npm run test.app.browser.app
    
If you want to run it only on the iOS device run

    OS=ios npm run test.app.browser.app

When you understand the code of this part of the coding session go to the next branch which is `02-quick-actions`.

## 02-quick-actions
You now checked out the `02-quick-actions`-branch. The code of the test which has been used for the demo can be found [here](./tests/quick.actions.spec.js).

If you want to run the `quick-actions`-tests on both devices just run

    npm run test.quick.actions
    
If you want to run it only on the Android device run

    OS=android npm run test.quick.actions
    
If you want to run it only on the iOS device run

    OS=ios npm run test.quick.actions

When you understand the code of this part of the coding session go to the next branch which is `03-poll`.
 
## Next steps
The session covers the following subjects:
- App-Browser-App Interaction => branch `01-app-browser-app`
- How To Automate Quick Actions => branch `02-quick-actions`
- Poll - What Would You Like To See => branch `03-poll`

Each subject has its own branch. Execute the following step to start for example the `01-app-browser-app`-branch

    git checkout 01-app-browser-app 

The automation code that belongs to that subject can be found in the [tests](./tests)-folder.

Happy testing!!!

Grtz

Wim Selles, aka wswebcreation
