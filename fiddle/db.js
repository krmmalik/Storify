// MongoDB test app. Getting to know MongoDB via MongooseJS

var mongoose = require ('mongoose'),
	Schema = mongoose.Schema;

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

//Insert Data
story.title = 'The Man in the green shirt';
//story.body = 'once upon a time, way back';
story.lines.push ({ author: 'Khuram', text: 'lets eat food'});
story.lines.push ({ author: 'Richard', text: 'lets jump'});


//save
story.save(function(err){

	if (err) {throw err; }
	console.log('saved story');
	mongoose.disconnect();
	
});