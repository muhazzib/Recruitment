import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDvXpsoJ_0gJuFnqS47m96iqpEihKPUzGg",
  authDomain: "hackathon-project-af54f.firebaseapp.com",
  databaseURL: "https://hackathon-project-af54f.firebaseio.com",
  projectId: "hackathon-project-af54f",
  storageBucket: "hackathon-project-af54f.appspot.com",
  messagingSenderId: "564273534152"
  };

  
export const fire = firebase.initializeApp(config);
export const firebaseSignOut=fire.auth(); 
export const database=fire.database().ref('/');
