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
  var room=localStorage.getItem("add_room");
  function send(){
     msg=document.getElementById("message").value;
     firebase.database().ref(room).push({
        name:user,
        message:msg,
        like:0

     })
     document.getElementById("message").value=""
     
  }
  function log_out(){
   localStorage.removeItem("user_name");
   localStorage.removeItem("add_room");
   window.location="index.html";
 }
 function get_data(){
  firebase.database().ref("/"+room).on('value',function(snapshot){
   document.getElementById("div").innerHTML="";
   snapshot.forEach(function(childsnapshot){
      childKey=childsnapshot.key;
      childdata=childsnapshot.val();
      if(childKey!="purpose"){
         message_id=childKey;
         message_data=childdata;
         message=message_data["message"]
         like=message_data["like"]
         name=message_data["name"]
         name_tag="<h4>"+name+"<img class='img1' src='tick.png'></h4>"
         message_tag="<h4>"+message+"</h4>"
         like_button="<button class='btn btn-warning' id="+message_id+"value="+like+"onclick='like_msg(this.id)'>"
         span_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button>"
      }

   })
  })
 }
 get_data()
  function like_msg(msg_id){
    button_id=msg_id
    like=document.getElementById(button_id).value
    updated_likes=Number(like)+1
    firebase.database().ref(room_name).child(msg_id).update({
      like:updated_likes
    })
  }