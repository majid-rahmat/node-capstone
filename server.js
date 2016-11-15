var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Author = require('./models/author');
Book = require('./models/book');

mongoose.connect('mongodb://localhost/capstone');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Please use /authors or /books');
});

app.get('/authors', function(req, res){
	Author.getAuthors(function(err, authors){
		if(err){
			throw err;
		}
		res.json(authors);
	});
});

app.post('/authors', function(req, res){
	var author = req.body;
	Author.addAuthor(author, function(err, author){
		if(err){
			throw err;
		}
		res.json(author);
	});
});

app.put('/authors/:_id', function(req, res){
	var id = req.params._id;
	var author = req.body;
	Author.updateAuthor(id, author, {}, function(err, author){
		if(err){
			throw err;
		}
		res.json(author);
	});
});

app.delete('/authors/:_id', function(req, res){
	var id = req.params._id;
	Author.removeAuthor(id, function(err, author){
		if(err){
			throw err;
		}
		res.json(author);
	});
});

app.get('/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/books/:_id', function(req, res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');