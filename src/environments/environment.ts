// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authenticationServiceUrl: 'http://localhost:8080/api/authenticate',
  signUpServiceUrl: 'http://localhost:8080/api/signUp',
  firebase: {
    apiKey: "AIzaSyAft6wJidr3O997-TV9eCcR_vEvvlvLHsw",
    authDomain: "my-fitness-tracker-aa73b.firebaseapp.com",
    databaseURL: "https://my-fitness-tracker-aa73b.firebaseio.com",
    projectId: "my-fitness-tracker-aa73b",
    storageBucket: "my-fitness-tracker-aa73b.appspot.com",
    messagingSenderId: "917760593288"
  }
};

/*
 * For easier debugging in development mode, you can  import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
