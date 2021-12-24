import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCd91IgLCOzyHyl3fCvsMhFCfQffxd1a1A",
	authDomain: "mytimesbook.firebaseapp.com",
	databaseURL:
		"https://mytimesbook-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "mytimesbook",
	storageBucket: "mytimesbook.appspot.com",
	messagingSenderId: "81961366723",
	appId: "1:81961366723:web:059f008b3e2d5971a51e76",
	measurementId: "G-ESDV24BKP0",
};

firebase.initializeApp(firebaseConfig);
// firebase.firestore();

// firebase.appCheck().activate("6LcXGW0cAAAAAMs4bN1EyoM9edchHZRgJU4MkKSM", true);

export default firebase;
