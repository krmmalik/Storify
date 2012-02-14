//Storify -- Khuram Malik

// Required Modules
var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , express = require('express')
  , mongoose = require ('mongoose')
  , Schema = mongoose.Schema;




app.listen(80);

app.get('/', function (req, res) {
  res.sendfile((__dirname + '/story.html'));
});


app.use(express.static(__dirname + '/public'));

//Create Schema	

var Lines = new Schema({
    author  : String,
	text  : String
});

var Story = new Schema ({
	
	maxlines: {type: Number, default: 3}, // Max number of lines per user
	date: {type: Date, default: Date.now},
	title: String,
	lines: [Lines]
	
	});


mongoose.connect('mongodb://localhost/test');

//setup model and pass it schema
mongoose.model ('Story',Story);

var StoryModel = mongoose.model ('Story');

var story = new StoryModel();

// Fixed params
story.title = 'Socketi';
// story.lines.push ({ author: 'Khuram', text:'socket data'});


//Capture data from socket into schema
io.sockets.on('connection', function (socket) {
    
  socket.emit('news', { hello: 'world' });
  
  socket.on('slog', function(data){
    story.lines.push ({
        author: 'Khuram',
        text: data.my
    });
  	story.save(function(err){
		if (err) {throw err; }
		console.log('saved story line');
	});
  });
  
});


//disconnect db
//mongoose.disconnect()

	
