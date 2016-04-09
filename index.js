var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

// Create the server
var app = express();

app.set('port', (process.env.PORT || 5000));

// Serving static files from public directory
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use body parser to read request bodies
app.use(bodyParser());

// Connect to the database
mongoose.connect(process.env.MONGOLAB_URI);

// Checking to make sure connection was successful
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

// Create the Schema and Model for messages
// Build your Schema and any methods before the Model
var messageSchema = mongoose.Schema({
  messageText: String // Only one data point - the message text
});

// Message Model
var Message = mongoose.model('Message', messageSchema);


// Look up and retrieve all currently posted messages
// Once found, render the html page from pages/index.ejs with the messages data
var getAndRenderPostedMessages = function(request, response) {
  Message.find(function (err, messages) { //This function will be called and run once Message.find finishes
    if (err) return console.error(err);
    var descendingMessages = messages.reverse(); // The messages come in ascending order, let's reverse it
    response.render('pages/index', {messages: descendingMessages}); // Render the page and hand the messages data
  })
}

// Set up our GET and POST requests

app.get('/', function(request, response) {
  getAndRenderPostedMessages(request, response);
}); // Just get and render

// First, send the message data from the post to our database and then afterward (callback), render the page.
app.post('/', function (request, response) {
  var newMessage = new Message({ messageText: request.body.message });
  newMessage.save(function (err, newMessage) {
    if (err) return console.error(err);
    getAndRenderPostedMessages(request, response);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
