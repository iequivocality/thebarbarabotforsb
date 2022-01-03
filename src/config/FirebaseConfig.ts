const FirebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? process.env.REACT_APP_FIREBASE_API_KEY : '',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN : '',
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL ? process.env.REACT_APP_FIREBASE_DATABASE_URL : '',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    accountEmail: process.env.REACT_APP_FIREBASE_ACCOUNT_EMAIL ? process.env.REACT_APP_FIREBASE_ACCOUNT_EMAIL : '',
    accountPassword: process.env.REACT_APP_FIREBASE_ACCOUNT_PASSWORD ? process.env.REACT_APP_FIREBASE_ACCOUNT_PASSWORD : ''
};

export default FirebaseConfig;