// MongoDB test app. Getting to know MongoDB via MongooseJS

var mongoose = require ('mongoose'),
	Schema = mongoose.Schema;

//Create Schema	
var Storydb = new Schema ({

	title: String,
	body: String,
	date: Date
	
	});

mongoose.connect('mongodb://localhost/test');

//setup model and pass it schema
mongoose.model ('Storydb',Storydb);

var StoryModel = mongoose.model ('Storydb');

var story = new StoryModel();

//Insert Data
story.title = 'The Man in the green shirt';
story.body = 'once upon a time, way back';
story.date = Date.now();

//save
story.save(function(err){

	if (err) {throw err; }
	console.log('saved story');
	mongoose.disconnect();
	
});