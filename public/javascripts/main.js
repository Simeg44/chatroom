$(function(){
	// connect the socket.io server
	var socket = io.connect("http://localhost");
	
	//define socket events
	socket.on("connect", function(){
		socket.on("message", function (msg) {
			console.log(msg);
			$("#room").append("<p>" + msg + "</p>");
		})
	})

	// Display message when user connects to room
	socket.on("connectMsg",function(msg){
		$("#room").append("<p>" + msg + "</p>");
	});

	// Display message when user leaves the room
	socket.on("disconnectMsg",function(msg, users){
		$("#room").append("<p>" + msg + "</p>");

		console.log(users);
		$("#users").empty();
		for (var i = 0; i < users.length; i++) {
			$("#users").append("<p id='" + users[i].user + "'>USER_" + users[i].user + "</p>");
		}
	});

	socket.on("joined", function(users){
		$("#users").empty();
		for (var i = 0; i < users.length; i++) {
			$("#users").append("<p id='" + users[i].user + "'>USER_" + users[i].user + "</p>");
		}
		
	});
	
	// attach events
	$("#message-input").on("keyup", function (event) {
		if (event.keyCode === 13) {
			var msg = $(this).val();
			socket.emit("message", msg);
		}
	})
});
