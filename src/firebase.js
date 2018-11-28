import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAaYgm3IbAiDnh3XEehXHzi2lwP9kl3L7s",
    authDomain: "shwackle-scrum.firebaseapp.com",
    databaseURL: "https://shwackle-scrum.firebaseio.com",
    projectId: "shwackle-scrum",
    storageBucket: "shwackle-scrum.appspot.com",
    messagingSenderId: "1007036711729"
};

firebase.initializeApp(config);

export default firebase;