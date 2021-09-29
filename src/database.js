(function () {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCmyR7c_EYWJfVHZ10RcXVjmKYSl1dxRH8",
    authDomain: "courso-b48d3.firebaseapp.com",
    databaseURL: "https://courso-b48d3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "courso-b48d3",
    storageBucket: "courso-b48d3.appspot.com",
    messagingSenderId: "431469792814",
    appId: "1:431469792814:web:f2aeaf69b8166d58b859bf"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Handle on firebase db
  const db = firebase.database();

  // Get elements
  const message = document.getElementById('message');
  const write = document.getElementById('write');
  const read = document.getElementById('read');
  const status = document.getElementById('status');

  // Write
  write.addEventListener('click', e => {
    const messages = db.ref('messages');

    // Simple id - ok for example, do not use in production
    const id = (new Date).getTime();

    // Write to db
    messages.child(id).set({'message': message.value})
      .then(function () {
        status.innerHTML = "Wrote to DB!";
      });
  });

    // Read
  read.addEventListener('click', e => {
      status.innerHTML = '';
      const messages = db.ref('messages');

      messages.once('value')
        .then(function (dataSnapshot) {
          var data = dataSnapshot.val();
          var keys = Object.keys(data);

          keys.forEach(function (key) {
            console.log(data[key]);
            status.innerHTML += JSON.stringify(data[key]) + '<br>';
          });
      });
  });

}());

