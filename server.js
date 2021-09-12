const express = require('express');
const app = express();
const https = require('http').Server(app);
const io = require('socket.io')(https);
const path = require('path');

//Serve public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, +'public/index.html'));
});

io.on('connection', socket => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('message', message => {
		console.log('message: ' + message);
		//Broadcast the message to everyone
		io.emit('message', message);
	});
});
https.listen(PORT, function() {
	console.log('listen to Port');
});
