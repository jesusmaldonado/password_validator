## Password Validator

The app validates passwords according to a specific algorithm and then displays it along in the app. The basic algorithm is:
1. Replace any English words with a character.
2. Count character types (letters, digits, whitespace, other)
3. Derive the strength of the word by: `length x numberOfTypes`
4. State the strength of the password and increase strength until necessary, giving preference to substitutions for character type and then length increase.

## Getting Started

In the project directory, you can run:

### `npm install`

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make and save edits.<br>
You will also see any lint errors in the console.

### `npm run test`
Runs the tests in the development mode.<br>

## TODO
Refactor logic? <br>
Consider using a websockets connection to remove some load from client side? <br>
Styling <br>
Figure out how to deploy this thing to heroku, need to find out what commands it's running <br>
