import app from 'firebase/app';
import 'firebase/auth';

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

        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.doSignInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;