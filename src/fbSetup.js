import firebase from 'firebase'

export const appName = 'learn-react-87515'

firebase.initializeApp({
    apiKey: "AIzaSyC-TkgWvybNsV7AOvDi_QZaTfJY5QnLLyE",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "161016664250"
});