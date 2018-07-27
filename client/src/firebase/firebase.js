import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAFqjx5rGGh4tpR481GgaGPl1Z_MHnV4To",
    authDomain: "tictactoe-3dfca.firebaseapp.com",
    databaseURL: "https://tictactoe-3dfca.firebaseio.com",
    projectId: "tictactoe-3dfca",
    storageBucket: "tictactoe-3dfca.appspot.com",
    messagingSenderId: "497231644873"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
  export {db}

  