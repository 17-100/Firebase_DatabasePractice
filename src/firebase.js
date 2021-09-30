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

  // Get a handle on firebase-services: database and storage
  const db = firebase.database();
  const storage = firebase.storage();


  // REALTIME DATABASE ------------------------------------------------------------------------------------------------
  // Get UI elements for database
  const message         = document.getElementById('message');
  const write           = document.getElementById('write');
  const read            = document.getElementById('read');
  const statusDB        = document.getElementById('statusDB');

  // Functionalities For Database
  // Write
  write.addEventListener('click', e => {
    const messages = db.ref('messages');
    // Simple id - ok for example, do not use in production
    const id = (new Date).getTime();
    // Write to db
    messages.child(id).set({'message': message.value})
      .then(function () {
        statusDB.innerHTML = "Wrote to DB!";
      });
  });

    // Read
  read.addEventListener('click', e => {
      statusDB.innerHTML = '';
      const messages = db.ref('messages');

      messages.once('value')
        .then(function (dataSnapshot) {
          var data = dataSnapshot.val();
          var keys = Object.keys(data);

          keys.forEach(function (key) {
            console.log(data[key]);
            statusDB.innerHTML += JSON.stringify(data[key]) + '<br>';
          });
      });
  });

  // STORAGE ------------------------------------------------------------------------------------------------
  // Functionalities For Storage
  // Get UI elements for storage
  const file              = document.getElementById('file');
  const upload            = document.getElementById('upload');
  const download          = document.getElementById('download');
  const statusStorage     = document.getElementById('statusStorage');
  const image             = document.getElementById('image');

  // Upload file
  upload.addEventListener('click', e => {
    // Create a file reference
    var ref = firebase.storage().ref('globe');
    let photo = document.getElementById("file").files[0];
    //upload
    ref.put(photo).then(function(snapshot) {
      console.log('Upload a blob or file!');
      statusStorage.innerHTML = 'Upload blob or file!';
    })
  });

  // Download file
  download.addEventListener('click', e => {
    // file reference
    var ref = firebase.storage().ref('globe');
    // download
    ref.getDownloadURL().then(function(url) {
      // insert url into an <img> tag to "download"
      image.src = url;
      statusStorage.innerHTML = 'Downloaded blob or file!'
    }).catch(function(error) {console.log(error)});
  });

}());

