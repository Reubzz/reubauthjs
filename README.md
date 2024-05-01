Secure and Fast, Backend Authentication System using [jsonwebtokens](https://www.npmjs.com/package/jsonwebtoken) in [Node.js](http://nodejs.org).

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init`](https://docs.npmjs.com/creating-a-package-json-file) command.

Installation is done using the
[`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) command:

```console
$ npm install reubauthjs
```

Follow [our quick start guide](#quick-start-guide) for more information.


## Quick Start Guide

### Installation: 
Assuming you’ve already installed [Node.js](https://nodejs.org/), create a directory to hold your application, and make that your working directory.
```console
$ mkdir app
$ cd app
```

Use the npm init command to create a package.json file for your application. For more information on how package.json works, see [Specifics of npm’s package.json handling](https://docs.npmjs.com/files/package.json).
```console
$ npm init
```

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:
```console
entry point: (index.js)
```

Enter `app.js`, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

Now, install reubz-authjs in the myapp directory and save it in the dependencies list. For example:
```console
$ npm isntall reubz-authjs
```

To install Express temporarily and not add it to the dependencies list:
```console
$ npm install express --no-save
```

### Basic Setup

This library requires certain variables and setup that you will have to implement initially during  your application's startup phase. These are as
In your `index.js`, require `reubz-authjs` with `const auth = require('reubz-authjs');` and pass an options object as a parameter.

Each option is as follows: 
- `dbUri`: The database URI that will be used by MongoDB.
- `jwtSecretKey`: A secret key which will be used to sign JSON Web Tokens. Get yours here -  


In your `index.js`:
```js
const authSys = require('reubz-authjs')({
    dbUri: // uri to your Database,
    jwtSecretKey: // your secret JWT Key.,
    cookieFields: {
        username: true,
        _id: true,
        // Enter Fields here that you need in the cookie variable.
    },
    loginExpiryIn: // Time in secs afterwhich the login expires.
});
```

## Help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, feel free to drop me a email - [contact@reubz.io](mailto:contact@reubz.io) or 