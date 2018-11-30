import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAaYgm3IbAiDnh3XEehXHzi2lwP9kl3L7s",
    authDomain: "shwackle-scrum.firebaseapp.com",
    databaseURL: "https://shwackle-scrum.firebaseio.com",
    projectId: "shwackle-scrum",
    storageBucket: "shwackle-scrum.appspot.com",
    messagingSenderId: "1007036711729"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
        this.store = firebase.firestore();

        this.store.settings({
            timestampsInSnapshots: true
        });
    }

    // Auth API

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    // Users API

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;