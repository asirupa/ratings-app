# Ratings App

This project is a common Ratings app which reads stream of ratings and pushes to the GUI using Web sockets.

1. In the application root (uiplatform-solution/ratings-app) run 
```javascript 
  yarn
```
2. `cd` into the `uiplatform-exercise` directory and run 
```javascript 
  yarn
  yarn start
```
3. Now, go back to `ratings-app` folder and run
```javascript 
  yarn start:server
```
Now, launch: `http://localhost:3001` in your favorite browser.

To run the application with large set of data, do following..

1. In the application root (uiplatform-solution/ratings-app) run 
```javascript 
  yarn
```
2. `cd` into the `uiplatform-exercise` directory, rename `lib` to `lib__` and rename `lib_` to `lib`
```javascript 
  yarn
  yarn start
```
3. Now, go back to `ratings-app` folder and run
```javascript 
  yarn start:server
```
Now, launch: `http://localhost:3001` in your favorite browser.