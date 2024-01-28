var firebaseConfig = {
    apiKey: "AIzaSyC6Xyo9j89YFpZ5xdGuxGWreNvn-h77SMM",
    authDomain: "giga-networking.firebaseapp.com",
    databaseURL: "https://giga-networking-default-rtdb.firebaseio.com",
    projectId: "giga-networking",
    storageBucket: "giga-networking.appspot.com",
    messagingSenderId: "908469830363",
    appId: "1:908469830363:web:9f58b1b909f7f5e44902fe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var user=localStorage.getItem("user_name");
  document.getElementById("welcom").innerHTML="welcome "+user+" !"
   
  function add_room(){
    room=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room).update({
      purpose:"add room"
    });
    localStorage.setItem("add_room", room);
    window.location="index3.html"

  }
  function get_room(){
    firebase.database().ref("/").on('value',function(snapshot){
      document.getElementById("div").innerHTML="";
      snapshot.forEach(function(childsnapshot){
        childkey=childsnapshot.key;
        room_name=childkey;
        row='<div id="'+room_name+ '" onclick="go_room(this.id)">'+room_name+'</div><hr>';
        document.getElementById("div").innerHTML+=row
      })
        
     

    })
  }
  get_room();
  function log_out(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("add_room");
    window.location="index.html";
  }
  function go_room(room){
    localStorage.setItem("add_room",room);
    window.location="index3.html";
  }
