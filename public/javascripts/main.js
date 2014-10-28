$(function(){
	// connect the socket.io server
	var socket = io.connect("http://localhost");
	
	//define socket events
	socket.on("connect", function(){
		console.log(users);
		socket.on("message", function (msg) {
			console.log(msg);
			$("#room").append("<p>" + msg + "</p>");
		})
	})

	// Display message when user connects to room
	socket.on("connectMsg",function(msg){
		console.log(users);
		$("#room").append("<p>" + msg + "</p>");
	});

	// Display message when user leaves the room
	socket.on("disconnectMsg",function(msg){
		$("#room").append("<p>" + msg + "</p>");
	});

	// socket.on("id", function(id){
	// 	$("#users").append("<p>USER_" + id + "</p>");
	// })
	
	// attach events
	$("#message-input").on("keyup", function (event) {
		if (event.keyCode === 13) {
			var msg = $(this).val();
			socket.emit("message", msg);
			console.log("worked");
		}
	})
});
